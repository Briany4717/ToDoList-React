import { useCallback, useEffect, useRef, useState } from 'react';

export const useUIState = () => {
  const [selectedTask, setSelectedTask] = useState<number | null>(null);
  const [selectedTile, setSelectedTile] = useState<number>(0);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>('');
  const [newDescription, setNewDescription] = useState<string>('');

  const firstInputRef = useRef<HTMLInputElement>(null);

  // Auto-focus en el modal cuando se abre
  useEffect(() => {
    if (showCreateModal && firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, [showCreateModal]);

  // Manejar selección de tareas
  const handleTaskSelection = useCallback((taskId: number): void => {
    setSelectedTask((prev) => (prev === taskId ? null : taskId));
  }, []);

  // Manejar selección de pestañas
  const handleTileSelect = useCallback((index: number): void => {
    setSelectedTile(index);
  }, []);

  // Manejar selección de fecha
  const handleDateSelect = useCallback((date: Date): void => {
    setSelectedDate(date);
  }, []);

  // Abrir modal de creación
  const openCreateModal = useCallback((): void => {
    setShowCreateModal(true);
  }, []);

  // Cerrar modal de creación
  const closeCreateModal = useCallback((): void => {
    setShowCreateModal(false);
    setNewTitle('');
    setNewDescription('');
  }, []);

  // Manejar cambio en término de búsqueda
  const handleSearchChange = useCallback((term: string): void => {
    setSearchTerm(term);
  }, []);

  // Reset de estado de UI
  const resetUIState = useCallback((): void => {
    setSelectedTask(null);
    setSelectedTile(0);
    setSearchTerm('');
    closeCreateModal();
  }, [closeCreateModal]);

  return {
    // State
    selectedTask,
    selectedTile,
    selectedDate,
    searchTerm,
    showCreateModal,
    newTitle,
    newDescription,
    firstInputRef,

    // Setters
    setNewTitle,
    setNewDescription,

    // Handlers
    handleTaskSelection,
    handleTileSelect,
    handleDateSelect,
    handleSearchChange,
    openCreateModal,
    closeCreateModal,
    resetUIState,
  };
};
