import { useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import { Task, TaskAction } from '../types';
import { tasksAPI, generateRandomAccent } from '../api';

// Reducer para manejar el estado de las tareas
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

export const useTasks = () => {
  const [tasks, dispatch] = useReducer(tasksReducer, []);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar tareas al inicializar
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

  // Alternar estado de completado
  const toggleTask = useCallback(async (taskId: number): Promise<void> => {
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

  // Crear nueva tarea
  const createTask = useCallback(async (title: string, description: string): Promise<void> => {
    if (!title.trim()) return;

    try {
      const newTask = {
        title: title.trim(),
        description: description.trim() || 'Sin descripción',
        accent: generateRandomAccent()
      };

      const createdTask = await tasksAPI.create(newTask);
      dispatch({ type: 'add', task: createdTask });
    } catch (err: unknown) {
      console.error('Error creando tarea:', err);
      setError(err instanceof Error ? err.message : 'Error desconocido');
      throw err; // Re-throw para que el componente pueda manejar el error
    }
  }, []);

  // Eliminar tarea
  const deleteTask = useCallback(async (taskId: number): Promise<void> => {
    try {
      await tasksAPI.delete(taskId);
      dispatch({ type: 'delete', id: taskId });
    } catch (err: unknown) {
      console.error('Error eliminando tarea:', err);
      setError(err instanceof Error ? err.message : 'Error desconocido');
    }
  }, []);

  // Actualizar tarea
  const updateTask = useCallback(async (taskId: number, updates: Partial<Task>): Promise<void> => {
    try {
      const updatedTask = await tasksAPI.update(taskId, updates);
      dispatch({ type: 'update', id: taskId, updates: updatedTask });
    } catch (err: unknown) {
      console.error('Error actualizando tarea:', err);
      setError(err instanceof Error ? err.message : 'Error desconocido');
    }
  }, []);

  // Filtrar tareas
  const filterTasks = useCallback((selectedTile: number, searchTerm: string): Task[] => {
    const term = searchTerm.trim().toLowerCase();
    const byStatus = selectedTile === 0
      ? tasks.filter((t: Task) => !t.isCompleted)
      : tasks.filter((t: Task) => t.isCompleted);
    
    if (!term) return byStatus;
    
    return byStatus.filter((t: Task) =>
      t.title.toLowerCase().includes(term) ||
      t.description.toLowerCase().includes(term)
    );
  }, [tasks]);

  // Limpiar error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    tasks,
    loading,
    error,
    toggleTask,
    createTask,
    deleteTask,
    updateTask,
    filterTasks,
    clearError
  };
};
