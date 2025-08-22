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
    firstInputRef,
    setNewTitle,
    setNewDescription,
    handleTaskSelection,
    handleTileSelect,
    handleDateSelect,
    handleSearchChange,
    openCreateModal,
    closeCreateModal,
  } = useUIState();

  const visibleTasks = useMemo((): Task[] => {
    const term = searchTerm.trim().toLowerCase();
    const byStatus =
      selectedTile === 0
        ? tasks.filter((t: Task) => !t.isCompleted)
        : tasks.filter((t: Task) => t.isCompleted);

    if (!term) return byStatus;

    return byStatus.filter(
      (t: Task) =>
        t.title.toLowerCase().includes(term) || t.description.toLowerCase().includes(term)
    );
  }, [tasks, selectedTile, searchTerm]);

  const handleCreateTask = useCallback(
    async (e: React.FormEvent): Promise<void> => {
      e.preventDefault();

      try {
        await createTask(newTitle, newDescription);
        closeCreateModal();
      } catch (err) {
        console.error('Error en la creación de tarea:', err);
      }
    },
    [newTitle, newDescription, createTask, closeCreateModal]
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
          <Calendar onDateSelect={handleDateSelect} selectedDate={selectedDate} />
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
        />
      )}
    </div>
  );
}

export default App;
