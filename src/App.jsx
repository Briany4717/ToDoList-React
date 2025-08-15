import './App.css'
import { useCallback, useMemo, useReducer, useRef, useState, useEffect } from 'react';
import { Calendar } from './Calendar';
import { CreationModal } from './CreationModal';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { tasksAPI, generateRandomAccent } from './api';

const NavBar = () => {
  return (
    <div className='fixed w-screen h-16 flex items-center px-4'>
      <span className='material-symbols-rounded mr-2'>partly_cloudy_night</span>
      <span className='text-2xl font-light' style={{ fontFamily: 'system-ui' }}>Task<span className='font-bold'>Manager</span></span>
    </div>
  );
}

// Eliminado TaskList: no se estaba usando

const TaskListItem = ({ id, title, description, accent, isCompleted, onToggle, isSelected, onSelect }) => {
  const [animation, setAnimation] = useState(true);
  const timeoutRef = useRef(null);

  const formatDescription = useCallback((text) => {
    if (!text) return '';
    return text.length > 100 ? `${text.slice(0, 100)}...` : text;
  }, []);

  const handleToggle = useCallback(() => {
    // Evita múltiples disparos durante la animación
    if (!animation) return;
    setAnimation(false);
    timeoutRef.current = setTimeout(() => {
      onToggle(id);
      setAnimation(true);
      timeoutRef.current = null;
    }, (isCompleted ? 1200 : 1200));
  }, [animation, id, onToggle, isCompleted]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
  return (
    <div onClick={() => onSelect(id)}
      className={`${animation ? 'shadow-md group' : '-mt-21 -z-10'} items-center w-full min-h-18 max-h-18 border border-gray-300 rounded-lg flex snap-start ${isCompleted ? '' : 'delay-800'} transition-all duration-300 cursor-pointer relative`}>
      <span className={`absolute material-symbols-rounded -z-1 ${isSelected && animation ? '-translate-x-8' : ''} ease-[cubic-bezier(.68,-0.55,.27,1.55)] transition-all duration-200`}
        style={{ fontSize: '2.0rem', color: isSelected ? accent : 'transparent' }}>chevron_right</span>
      <div className='bg-[#F8F9FA] w-full h-full flex items-center rounded-4xl justify-between pr-6'>
        <div className='flex items-center gap-4 transition-all duration-200'>
          <div className={`group-hover:h-10 h-9 w-1 -ml-[0.12rem] rounded-lg transition-all duration-200`}
            style={{ backgroundColor: accent }}></div>
          <div className='flex flex-col'>
            <span className={`text-lg font-semibold transition-colors duration-200 ${isCompleted ? 'line-through' : ''}`}>{title}</span>
            <span className={`text-sm text-gray-700 pl-1 transition-all duration-200 ${isCompleted ? 'line-through' : ''}`}>{formatDescription(description)}</span>
          </div>
        </div>
        <span
          onClick={handleToggle}
          className={`material-symbols-rounded items-center justify-center cursor-pointer ${animation ? 'hover:text-blue-400 hover:scale-110' : ''} 
            transition-all duration-200 overflow-hidden text-3 ${isCompleted ? (animation ? 'text-green-500' : '') : ''}`}
          style={{ fontSize: '2.0rem', fontVariationSettings: "'FILL' 1" }}
        >

          {!isCompleted ? (animation ? 'radio_button_unchecked' : <DotLottieReact
            src="src/assets/ou4GUxLpi7.lottie"
            loop={false}
            autoplay={!animation}
            speed={1.5}
            style={{ position: 'absolute', width: '5rem', height: '5rem', marginLeft: '-3.5rem', marginTop: '-2.5rem', zIndex: 2 }}
          />) : (animation ? 'check_circle' : 'radio_button_unchecked')}

        </span>

      </div>
    </div>
  );
}

const SearchBar = ({ value, onChange }) => {
  return (
    <div className='w-full h-12 flex items-center px-4 bg-gray-200 rounded-lg my-5'>
      <span className='material-symbols-rounded text-gray-500 mr-2'>search</span>
      <input
        type='text'
        placeholder='Buscar tarea...'
        className='w-full h-full outline-none text-lg'
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}

const TiledMenu = ({ children, tiles, selectedTile, onSelect }) => {
  return (
    <div className='flex flex-col w-full'>
      <div className='flex gap-4'>
        {tiles.map((tile, index) => (
          <div
            key={index}
            className={`text-lg px-2 border-b cursor-pointer ${selectedTile === index ? 'border-black opacity-100' : 'border-transparent opacity-50'} transition-colors duration-200 ease-in-out`}
            onClick={() => onSelect(index)}
          >
            {tile}
          </div>
        ))}
      </div>
      <div className='flex flex-col h-160 overflow-y-scroll px-6 pt-3 gap-3 border-t-1 border-gray-300 snap-y scroll-smooth'>
        {children}
      </div>
    </div>
  )
}

const TaskDetailsCard = ({ task }) => {
  if (!task) return <div className='mt-12 p-4 rounded-lg border shadow-md border-gray-200'>Selecciona una tarea para ver sus detalles.</div>;

  const { title, description, isCompleted } = task || {};
  return (
    <div className='mt-12 p-4 rounded-lg border shadow-md border-gray-200'>
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

const FloatingButton = ({ onClick, ariaExpanded }) => {
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


function App() {
  // Estado para manejar todas las tareas con useReducer
  const initialTasks = useMemo(() => [], []); // Tareas vacías inicialmente

  function tasksReducer(state, action) {
    switch (action.type) {
      case 'set_all':
        return action.tasks;
      case 'toggle':
        return state.map(task =>
          task.id === action.id
            ? { ...task, isCompleted: action.isCompleted }
            : task
        );
      case 'add':
        return [...state, action.task];
      case 'update':
        return state.map(task =>
          task.id === action.id ? { ...task, ...action.updates } : task
        );
      case 'delete':
        return state.filter(task => task.id !== action.id);
      default:
        return state;
    }
  }

  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedTile, setSelectedTile] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const firstInputRef = useRef(null);

  // Cargar tareas desde el backend al montar el componente
  useEffect(() => {
    const loadTasks = async () => {
      try {
        setLoading(true);
        setError(null);
        const tasksFromDB = await tasksAPI.getAll();
        dispatch({ type: 'set_all', tasks: tasksFromDB });
      } catch (err) {
        setError(err.message);
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

  const handleTaskSelection = useCallback((taskId) => {
    setSelectedTask(prev => prev === taskId ? null : taskId);
  }, []);

  // Función para alternar el estado de completado de una tarea
  const toggleTaskCompletion = useCallback(async (taskId) => {
    try {
      const updatedTask = await tasksAPI.toggle(taskId);
      dispatch({
        type: 'toggle',
        id: taskId,
        isCompleted: updatedTask.isCompleted
      });
    } catch (err) {
      console.error('Error toggleando tarea:', err);
      setError(err.message);
    }
  }, []);

  const handleTileSelect = useCallback((index) => {
    setSelectedTile(index);
  }, []);

  // Función para manejar selección de fecha
  const handleDateSelect = useCallback((date) => {
    setSelectedDate(date);
  }, []);

  const openCreate = useCallback(() => {
    setShowCreateModal(true);
  }, []);

  const closeCreate = useCallback(() => {
    setShowCreateModal(false);
    setNewTitle('');
    setNewDescription('');
  }, []);

  const handleCreateTask = useCallback(async (e) => {
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
    } catch (err) {
      console.error('Error creando tarea:', err);
      setError(err.message);
    }
  }, [newTitle, newDescription, closeCreate]);

  // Filtro por estado y búsqueda
  const visibleTasks = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    const byStatus = selectedTile === 0
      ? tasks.filter(t => !t.isCompleted)
      : tasks.filter(t => t.isCompleted);
    if (!term) return byStatus;
    return byStatus.filter(t =>
      t.title.toLowerCase().includes(term) ||
      t.description.toLowerCase().includes(term)
    );
  }, [tasks, selectedTile, searchTerm]);

  return (
    <div className='h-screen'>
      <NavBar />
      <div className='flex justify-evenly w-screen h-full pt-12'>
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
              visibleTasks.map(task => (
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
        <div className='flex flex-col justify-start'>
          <TaskDetailsCard task={tasks.find(t => t.id === selectedTask)} />
          <Calendar onDateSelect={handleDateSelect} selectedDate={selectedDate} />
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
