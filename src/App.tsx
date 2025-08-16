import './App.css'
import React, { useCallback, useMemo, useReducer, useRef, useState, useEffect } from 'react';
import { Calendar } from './Calendar';
import { CreationModal } from './CreationModal';
import { tasksAPI, generateRandomAccent } from './api';
import { TaskListItem } from './TaskListItem';
import { Task, TaskAction, SearchBarProps, TiledMenuProps, TaskDetailsCardProps, FloatingButtonProps } from './types';

const NavBar: React.FC = () => {
  return (
    <div className='fixed w-screen h-16 flex items-center px-4'>
      <span className='material-symbols-rounded mr-2'>partly_cloudy_night</span>
      <span className='text-2xl font-light' style={{ fontFamily: 'system-ui' }}>Task<span className='font-bold'>Manager</span></span>
    </div>
  );
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <div className='w-full h-12 flex items-center px-4 bg-gray-200 rounded-lg my-5'>
      <span className='material-symbols-rounded text-gray-500 mr-2'>search</span>
      <input
        type='text'
        placeholder='Buscar tarea...'
        className='w-full h-full outline-none text-lg'
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
      />
    </div>
  )
}

const TiledMenu: React.FC<TiledMenuProps> = ({ children, tiles, selectedTile, onSelect }) => {
  return (
    <div className='flex flex-col w-full'>
      <div className='flex gap-4'>
        {tiles.map((tile: string, index: number) => (
          <div
            key={index}
            className={`text-lg px-2 border-b cursor-pointer ${selectedTile === index ? 'border-black opacity-100' : 'border-transparent opacity-50'} transition-colors duration-200 ease-in-out`}
            onClick={() => onSelect(index)}
          >
            {tile}
          </div>
        ))}
      </div>
      <div className='flex flex-col h-200 overflow-y-scroll px-6 pt-3 gap-3 border-t-1 border-gray-300 scroll-smooth'>
        {children}
      </div>
    </div>
  )
}

const TaskDetailsCard: React.FC<TaskDetailsCardProps> = ({ task }) => {
  if (!task) return <div className='mt-12 p-4 rounded-lg border shadow-md border-gray-200'>Selecciona una tarea para ver sus detalles.</div>;

  const { title, description, isCompleted } = task || {};
  return (
    <div className='w-120 mt-12 p-4 rounded-lg border shadow-md border-gray-200'>
      <div className='flex items-center justify-between mb-4'>
        <div className='flex items-center gap-2'>
          <div className={`h-2 w-2 rounded-full`} style={{ backgroundColor: task.accent }}></div>
          <h4 className='text-gray-700 text-lg font-semibold'>{title !== undefined ? title : 'Detalles de la Tarea'}</h4>
        </div>

        <span className={`material-symbols-rounded text-gray-400 cursor-pointer ${isCompleted ? 'text-green-500' : ''}`}
          style={{ fontVariationSettings: "'FILL' 1" }}>{isCompleted !== undefined ? (isCompleted ? 'check_circle' : 'radio_button_unchecked') : ''}</span>
      </div>
      <p className='text-gray-700 px-1'>{description !== undefined ? description : 'Aquí puedes ver y editar los detalles de la tarea seleccionada.'}</p>
      <div className='flex mt-1 items-end gap-2 w-full justify-end'>
        <span className='material-symbols-rounded text-gray-600 cursor-pointer'>edit</span>
        <span className='material-symbols-rounded text-red-500 cursor-pointer'>delete</span>
      </div>
    </div>
  );
}

const FloatingButton: React.FC<FloatingButtonProps> = ({ onClick, ariaExpanded }) => {
  return (
    <div className='fixed bottom-8 right-8 z-40'>
      <button
        onClick={onClick}
        className='group relative flex items-center gap-2 bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-medium shadow-xl rounded-full px-5 py-3 transition-all duration-200'
        aria-haspopup='dialog'
        aria-expanded={ariaExpanded}
      >
        <span className='material-symbols-rounded text-2xl'>add</span>
        <span className='pr-1'>Nueva Tarea</span>
        <span className='absolute inset-0 rounded-full bg-blue-400 opacity-0 group-hover:opacity-20 transition-opacity'></span>
      </button>
    </div>
  )
}


function App(): React.JSX.Element {
  // Estado para manejar todas las tareas con useReducer
  const initialTasks = useMemo<Task[]>(() => [], []); // Tareas vacías inicialmente

  function tasksReducer(state: Task[], action: TaskAction): Task[] {
    switch (action.type) {
      case 'set_all':
        return action.tasks;
      case 'toggle':
        return state.map((task: Task) =>
          task.id === action.id
            ? { ...task, isCompleted: action.isCompleted }
            : task
        );
      case 'add':
        return [...state, action.task];
      case 'update':
        return state.map((task: Task) =>
          task.id === action.id ? { ...task, ...action.updates } : task
        );
      case 'delete':
        return state.filter((task: Task) => task.id !== action.id);
      default:
        return state;
    }
  }

  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedTask, setSelectedTask] = useState<number | null>(null);
  const [selectedTile, setSelectedTile] = useState<number>(0);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>('');
  const [newDescription, setNewDescription] = useState<string>('');
  const firstInputRef = useRef<HTMLInputElement>(null);

  // Cargar tareas desde el backend al montar el componente
  useEffect(() => {
    const loadTasks = async () => {
      try {
        setLoading(true);
        setError(null);
        const tasksFromDB = await tasksAPI.getAll();
        dispatch({ type: 'set_all', tasks: tasksFromDB });
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
        console.error('Error cargando tareas:', err);
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, []);

  // Enfocar al abrir modal
  useEffect(() => {
    if (showCreateModal && firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, [showCreateModal]);

  const handleTaskSelection = useCallback((taskId: number): void => {
    setSelectedTask(prev => prev === taskId ? null : taskId);
  }, []);

  // Función para alternar el estado de completado de una tarea
  const toggleTaskCompletion = useCallback(async (taskId: number): Promise<void> => {
    try {
      const updatedTask = await tasksAPI.toggle(taskId);
      dispatch({
        type: 'toggle',
        id: taskId,
        isCompleted: updatedTask.isCompleted
      });
    } catch (err: unknown) {
      console.error('Error toggleando tarea:', err);
      setError(err instanceof Error ? err.message : 'Error desconocido');
    }
  }, []);

  const handleTileSelect = useCallback((index: number): void => {
    setSelectedTile(index);
  }, []);

  // Función para manejar selección de fecha
  const handleDateSelect = useCallback((date: Date): void => {
    setSelectedDate(date);
  }, []);

  const openCreate = useCallback((): void => {
    setShowCreateModal(true);
  }, []);

  const closeCreate = useCallback((): void => {
    setShowCreateModal(false);
    setNewTitle('');
    setNewDescription('');
  }, []);

  const handleCreateTask = useCallback(async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    const title = newTitle.trim();
    if (!title) return; // No crear si título vacío

    try {
      const description = newDescription.trim();
      const newTask = {
        title,
        description: description || 'Sin descripción',
        accent: generateRandomAccent()
      };

      const createdTask = await tasksAPI.create(newTask);
      dispatch({ type: 'add', task: createdTask });
      closeCreate();
    } catch (err: unknown) {
      console.error('Error creando tarea:', err);
      setError(err instanceof Error ? err.message : 'Error desconocido');
    }
  }, [newTitle, newDescription, closeCreate]);

  // Filtro por estado y búsqueda
  const visibleTasks = useMemo((): Task[] => {
    const term = searchTerm.trim().toLowerCase();
    const byStatus = selectedTile === 0
      ? tasks.filter((t: Task) => !t.isCompleted)
      : tasks.filter((t: Task) => t.isCompleted);
    if (!term) return byStatus;
    return byStatus.filter((t: Task) =>
      t.title.toLowerCase().includes(term) ||
      t.description.toLowerCase().includes(term)
    );
  }, [tasks, selectedTile, searchTerm]);

  return (
    <div className='h-screen'>
      <NavBar />
      <div className='flex justify-between w-screen h-full pt-12'>
        <div className='items-start text-2xl font-normal w-3/5 p-10 flex flex-col' style={{ fontFamily: 'system-ui' }}>
          Mis Tareas

          {error && (
            <div className='w-full p-3 mb-4 bg-red-100 border border-red-400 text-red-700 rounded'>
              Error: {error}
            </div>
          )}

          <SearchBar value={searchTerm} onChange={setSearchTerm} />
          <TiledMenu tiles={['Por Hacer', 'Completadas']} selectedTile={selectedTile} onSelect={handleTileSelect}>
            {loading ? (
              <div className='flex items-center justify-center h-32'>
                <span className='text-lg text-gray-500'>Cargando tareas...</span>
              </div>
            ) : (
              visibleTasks.map((task: Task) => (
                <TaskListItem
                  key={task.id}
                  id={task.id}
                  title={task.title}
                  description={task.description}
                  accent={task.accent}
                  isCompleted={task.isCompleted}
                  onToggle={toggleTaskCompletion}
                  isSelected={selectedTask === task.id}
                  onSelect={handleTaskSelection}
                />
              ))
            )}
          </TiledMenu>
        </div>
        <div className='flex flex-col justify-start pr-30'>
          <TaskDetailsCard task={tasks.find((t: Task) => t.id === selectedTask)} />
          {<Calendar onDateSelect={handleDateSelect} selectedDate={selectedDate} />}
        </div>
      </div>

      {/* Botón flotante crear tarea */}
      <FloatingButton onClick={openCreate} ariaExpanded={showCreateModal} />

      {/* Modal creación */}
      {showCreateModal && (
        <CreationModal
          handleCreateTask={handleCreateTask}
          closeCreate={closeCreate}
          firstInputRef={firstInputRef}
          newTitle={newTitle}
          setNewTitle={setNewTitle}
          newDescription={newDescription}
          setNewDescription={setNewDescription}
        />
      )}
    </div>
  )
}

export default App
