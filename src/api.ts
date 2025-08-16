import { Task, CreateTaskData } from './types';

// Configuración de la API
const API_BASE_URL = 'http://localhost:3001/api';

// Función helper para hacer requests
const apiRequest = async <T>(endpoint: string, options: RequestInit = {}): Promise<T> => {
    const url = `${API_BASE_URL}${endpoint}`;
    const config: RequestInit = {
        headers: {
            'Content-Type': 'application/json',
        },
        ...options,
    };

    try {
        const response = await fetch(url, config);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || `Error ${response.status}`);
        }

        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

// Servicios para tareas
export const tasksAPI = {
    // Obtener todas las tareas
    getAll: (): Promise<Task[]> => apiRequest<Task[]>('/tasks'),

    // Obtener una tarea por ID
    getById: (id: number): Promise<Task> => apiRequest<Task>(`/tasks/${id}`),

    // Crear nueva tarea
    create: (task: CreateTaskData): Promise<Task> => apiRequest<Task>('/tasks', {
        method: 'POST',
        body: JSON.stringify(task),
    }),

    // Actualizar tarea completa
    update: (id: number, task: Partial<Task>): Promise<Task> => apiRequest<Task>(`/tasks/${id}`, {
        method: 'PUT',
        body: JSON.stringify(task),
    }),

    // Toggle estado completado
    toggle: (id: number): Promise<Task> => apiRequest<Task>(`/tasks/${id}/toggle`, {
        method: 'PATCH',
    }),

    // Eliminar tarea
    delete: (id: number): Promise<void> => apiRequest<void>(`/tasks/${id}`, {
        method: 'DELETE',
    }),
};

// Función para generar color aleatorio para nuevas tareas
export const generateRandomAccent = (): string => {
    const colors: string[] = [
        '#F15050', '#2baf2a', '#955FF9', '#EA3BC1',
        '#16bcc4', '#ecc100', '#ff6b6b', '#4ecdc4',
        '#45b7d1', '#f9ca24', '#f0932b', '#eb4d4b',
        '#6c5ce7', '#a29bfe', '#fd79a8', '#fdcb6e'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
};
