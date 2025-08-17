import { CreateTaskData, Task } from '../../types';
import { apiRequest } from '../client';

export const tasksService = {
  // Obtener todas las tareas
  getAll: (): Promise<Task[]> => apiRequest<Task[]>('/tasks'),

  // Obtener una tarea por ID
  getById: (id: number): Promise<Task> => apiRequest<Task>(`/tasks/${id}`),

  // Crear nueva tarea
  create: (task: CreateTaskData): Promise<Task> =>
    apiRequest<Task>('/tasks', {
      method: 'POST',
      body: JSON.stringify(task),
    }),

  // Actualizar tarea completa
  update: (id: number, task: Partial<Task>): Promise<Task> =>
    apiRequest<Task>(`/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(task),
    }),

  // Toggle estado completado
  toggle: (id: number): Promise<Task> =>
    apiRequest<Task>(`/tasks/${id}/toggle`, {
      method: 'PATCH',
    }),

  // Eliminar tarea
  delete: (id: number): Promise<void> =>
    apiRequest<void>(`/tasks/${id}`, {
      method: 'DELETE',
    }),
};
