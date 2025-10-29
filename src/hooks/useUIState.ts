import { useCallback, useEffect, useRef, useState } from 'react';
import { Tag, Task } from '../types';

export const useUIState = () => {
  const [selectedTask, setSelectedTask] = useState<number | null>(null);
  const [selectedTile, setSelectedTile] = useState<number>(0);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<number | null>(null);
  const [newTitle, setNewTitle] = useState<string>('');
  const [newDescription, setNewDescription] = useState<string>('');
  const [newDueDate, setNewDueDate] = useState<string>('');
  const [newTags, setNewTags] = useState<Tag[]>([]);
  const [editTitle, setEditTitle] = useState<string>('');
  const [editDescription, setEditDescription] = useState<string>('');
  const [editDueDate, setEditDueDate] = useState<string>('');
  const [editTags, setEditTags] = useState<Tag[]>([]);

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

  const handleDateSelect = useCallback((date: Date | null): void => {
    setSelectedDate(date);
  }, []);

  const openCreateModal = useCallback((): void => {
    setShowCreateModal(true);
  }, []);

  const closeCreateModal = useCallback((): void => {
    setShowCreateModal(false);
    setNewTitle('');
    setNewDescription('');
    setNewDueDate('');
    setNewTags([]);
  }, []);

  const openEditModal = useCallback((task: Task): void => {
    setTaskToEdit(task);
    setEditTitle(task.title);
    setEditDescription(task.description);
    setEditDueDate(task.dueDate || '');
    setEditTags(task.tags || []);
    setShowEditModal(true);
  }, []);

  const closeEditModal = useCallback((): void => {
    setShowEditModal(false);
    setTaskToEdit(null);
    setEditTitle('');
    setEditDescription('');
    setEditDueDate('');
    setEditTags([]);
  }, []);

  const openDeleteModal = useCallback((taskId: number): void => {
    setTaskToDelete(taskId);
    setShowDeleteModal(true);
  }, []);

  const closeDeleteModal = useCallback((): void => {
    setShowDeleteModal(false);
    setTaskToDelete(null);
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
    showEditModal,
    showDeleteModal,
    taskToEdit,
    taskToDelete,
    newTitle,
    newDescription,
    newDueDate,
    newTags,
    editTitle,
    editDescription,
    editDueDate,
    editTags,
    firstInputRef,

    setNewTitle,
    setNewDescription,
    setNewDueDate,
    setNewTags,
    setEditTitle,
    setEditDescription,
    setEditDueDate,
    setEditTags,

    handleTaskSelection,
    handleTileSelect,
    handleDateSelect,
    handleSearchChange,
    openCreateModal,
    closeCreateModal,
    openEditModal,
    closeEditModal,
    openDeleteModal,
    closeDeleteModal,
    resetUIState,
  };
};
