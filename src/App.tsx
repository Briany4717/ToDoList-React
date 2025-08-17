import React, { useCallback, useMemo } from 'react';

// Styles
import './styles/App.css';

// Components
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

// Hooks
import { useTasks, useUIState } from './hooks';

// Types
import { Task } from './types';

function App() {
  // Custom hooks para manejar estado y lógica
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

  // Filtrar tareas basado en el estado actual
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

  // Manejar creación de tarea
  const handleCreateTask = useCallback(
    async (e: React.FormEvent): Promise<void> => {
      e.preventDefault();

      try {
        await createTask(newTitle, newDescription);
        closeCreateModal();
      } catch (err) {
        // El error ya se maneja en el hook useTasks
        console.error('Error en la creación de tarea:', err);
      }
    },
    [newTitle, newDescription, createTask, closeCreateModal]
  );

  // Obtener tarea seleccionada
  const selectedTaskData = useMemo(
    () => tasks.find((t: Task) => t.id === selectedTask),
    [tasks, selectedTask]
  );

  return (
    <div className='min-h-screen bg-gray-50'>
      <NavBar />

      <div className='flex justify-between w-screen min-h-screen pt-10'>
        {/* Panel principal de tareas */}
        <div className='flex-1 max-w-3xl p-10'>
          <h2
            className='text-2xl font-normal mb-6 text-gray-800'
            style={{ fontFamily: 'system-ui' }}
          >
            Mis Tareas
          </h2>

          {/* Manejo de errores */}
          {error && <ErrorMessage message={error} onDismiss={clearError} />}

          {/* Barra de búsqueda */}
          <SearchBar value={searchTerm} onChange={handleSearchChange} />

          {/* Menu con pestañas y lista de tareas */}
          <TiledMenu
            tiles={['Por Hacer', 'Completadas']}
            selectedTile={selectedTile}
            onSelect={handleTileSelect}
          >
            <TaskList
              tasks={visibleTasks}
              loading={loading}
              selectedTask={selectedTask}
              onToggleTask={toggleTask}
              onSelectTask={handleTaskSelection}
            />
          </TiledMenu>
        </div>

        {/* Panel lateral derecho */}
        <div className='flex flex-col justify-start pr-8 pt-10'>
          <TaskDetailsCard task={selectedTaskData} />
          <Calendar onDateSelect={handleDateSelect} selectedDate={selectedDate} />
        </div>
      </div>

      {/* Botón flotante para crear tarea */}
      <FloatingButton onClick={openCreateModal} ariaExpanded={showCreateModal} />

      {/* Modal de creación */}
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
