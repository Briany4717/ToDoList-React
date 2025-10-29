import React, { Suspense, useCallback, useMemo } from 'react';

import './styles/App.css';

import {
  Calendar,
  CreationModal,
  ErrorMessage,
  FloatingButton,
  NavBar,
  SearchBar,
  TaskDetailsCard,
  TaskList,
  TiledMenu,
} from './components';

import { useTasks, useUIState } from './hooks';

import { ActivitySection } from './components/ui/ActivitySection';
import { Task } from './types';

function App() {
  const { tasks, loading, error, toggleTask, createTask, clearError } = useTasks();

  const {
    selectedTask,
    selectedTile,
    selectedDate,
    searchTerm,
    showCreateModal,
    newTitle,
    newDescription,
    newDueDate,
    firstInputRef,
    setNewTitle,
    setNewDescription,
    setNewDueDate,
    handleTaskSelection,
    handleTileSelect,
    handleDateSelect,
    handleSearchChange,
    openCreateModal,
    closeCreateModal,
  } = useUIState();

  const visibleTasks = useMemo((): Task[] => {
    const term = searchTerm.trim().toLowerCase();
    let filtered = tasks;

    // Filtrar por estado (Por Hacer / Completadas)
    filtered =
      selectedTile === 0
        ? filtered.filter((t: Task) => !t.isCompleted)
        : filtered.filter((t: Task) => t.isCompleted);

    // Filtrar por fecha seleccionada en el calendario
    if (selectedDate) {
      const normalizedSelectedDate = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate()
      );
      
      filtered = filtered.filter((t: Task) => {
        if (!t.dueDate) return false;
        const taskDate = new Date(t.dueDate);
        const normalizedTaskDate = new Date(
          taskDate.getFullYear(),
          taskDate.getMonth(),
          taskDate.getDate()
        );
        return normalizedTaskDate.getTime() === normalizedSelectedDate.getTime();
      });
    }

    // Filtrar por término de búsqueda
    if (term) {
      filtered = filtered.filter(
        (t: Task) =>
          t.title.toLowerCase().includes(term) || t.description.toLowerCase().includes(term)
      );
    }

    return filtered;
  }, [tasks, selectedTile, searchTerm, selectedDate]);

  const handleCreateTask = useCallback(
    async (e: React.FormEvent): Promise<void> => {
      e.preventDefault();

      try {
        await createTask(newTitle, newDescription, newDueDate || undefined);
        closeCreateModal();
      } catch (err) {
        console.error('Error en la creación de tarea:', err);
      }
    },
    [newTitle, newDescription, newDueDate, createTask, closeCreateModal]
  );

  const selectedTaskData = useMemo(
    () => tasks.find((t: Task) => t.id === selectedTask),
    [tasks, selectedTask]
  );

  const completedTasks = useMemo(() => tasks.filter((t: Task) => t.isCompleted).length, [tasks]);
  const pendingTasks = useMemo(() => tasks.filter((t: Task) => !t.isCompleted).length, [tasks]);

  return (
    <div className='max-h-screen h-screen bg-gray-50'>
      <NavBar />

      <div className='flex justify-between w-screen'>
        <div className='flex-1 max-w-3xl pt-2 pl-10'>
          <h2
            className='text-2xl font-normal mb-1 mt-5 text-gray-800'
            style={{ fontFamily: 'system-ui' }}
          >
            Mis Tareas
          </h2>

          {error && <ErrorMessage message={error} onDismiss={clearError} />}

          <SearchBar value={searchTerm} onChange={handleSearchChange} />
          
          {selectedDate && (
            <div className='mb-3 p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-center justify-between date-filter-banner'>
              <div className='flex items-center gap-2'>
                <span className='material-symbols-rounded text-blue-600'>calendar_today</span>
                <span className='text-sm text-blue-800 font-medium'>
                  Filtrando tareas del{' '}
                  {selectedDate.toLocaleDateString('es-ES', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </span>
              </div>
              <button
                onClick={() => handleDateSelect(null)}
                className='material-symbols-rounded text-blue-600 hover:text-blue-800 cursor-pointer hover:bg-blue-100 p-1 rounded transition-colors'
                aria-label='Limpiar filtro de fecha'
              >
                close
              </button>
            </div>
          )}
          
          <TiledMenu
            tiles={['Por Hacer', 'Completadas']}
            selectedTile={selectedTile}
            onSelect={handleTileSelect}
          >
            <Suspense fallback={<div className='text-gray-500'>Cargando tareas...</div>}>
            <TaskList
              tasks={visibleTasks}
              loading={loading}
              selectedTask={selectedTask}
              onToggleTask={toggleTask}
              onSelectTask={handleTaskSelection}
              />
            </Suspense>
          </TiledMenu>
        </div>

        <div className='flex flex-col justify-center ml-9 pt-10 '>
          <TaskDetailsCard task={selectedTaskData} />
          <Calendar onDateSelect={handleDateSelect} selectedDate={selectedDate} tasks={tasks} />
        </div>
        <ActivitySection completedTasks={completedTasks} pendingTasks={pendingTasks} />
      </div>
      <FloatingButton onClick={openCreateModal} ariaExpanded={showCreateModal} />
      {showCreateModal && (
        <CreationModal
          handleCreateTask={handleCreateTask}
          closeCreate={closeCreateModal}
          firstInputRef={firstInputRef}
          newTitle={newTitle}
          setNewTitle={setNewTitle}
          newDescription={newDescription}
          setNewDescription={setNewDescription}
          newDueDate={newDueDate}
          setNewDueDate={setNewDueDate}
        />
      )}
    </div>
  );
}

export default App;
