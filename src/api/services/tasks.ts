import { CreateTaskData, Task } from '../../types';
import { apiRequest } from '../client';

export const tasksService = {
  getAll: (): Promise<Task[]> => apiRequest<Task[]>('/tasks'),

  getById: (id: number): Promise<Task> => apiRequest<Task>(`/tasks/${id}`),

  create: (task: CreateTaskData): Promise<Task> =>
    apiRequest<Task>('/tasks', {
      method: 'POST',
      body: JSON.stringify(task),
    }),

  update: (id: number, task: Partial<Task>): Promise<Task> =>
    apiRequest<Task>(`/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(task),
    }),

  toggle: (id: number): Promise<Task> =>
    apiRequest<Task>(`/tasks/${id}/toggle`, {
      method: 'PATCH',
    }),

  delete: (id: number): Promise<void> =>
    apiRequest<void>(`/tasks/${id}`, {
      method: 'DELETE',
    }),
};
