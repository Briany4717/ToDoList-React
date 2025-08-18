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

  useEffect(() => {
    if (showCreateModal && firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, [showCreateModal]);

  const handleTaskSelection = useCallback((taskId: number): void => {
    setSelectedTask((prev) => (prev === taskId ? null : taskId));
  }, []);

  const handleTileSelect = useCallback((index: number): void => {
    setSelectedTile(index);
  }, []);

  const handleDateSelect = useCallback((date: Date): void => {
    setSelectedDate(date);
  }, []);

  const openCreateModal = useCallback((): void => {
    setShowCreateModal(true);
  }, []);

  const closeCreateModal = useCallback((): void => {
    setShowCreateModal(false);
    setNewTitle('');
    setNewDescription('');
  }, []);

  const handleSearchChange = useCallback((term: string): void => {
    setSearchTerm(term);
  }, []);

  const resetUIState = useCallback((): void => {
    setSelectedTask(null);
    setSelectedTile(0);
    setSearchTerm('');
    closeCreateModal();
  }, [closeCreateModal]);

  return {
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
    resetUIState,
  };
};
