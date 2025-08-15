// Configuración de la API
const API_BASE_URL = 'http://localhost:3001/api';

// Función helper para hacer requests
const apiRequest = async (endpoint, options = {}) => {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
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
    getAll: () => apiRequest('/tasks'),

    // Obtener una tarea por ID
    getById: (id) => apiRequest(`/tasks/${id}`),

    // Crear nueva tarea
    create: (task) => apiRequest('/tasks', {
        method: 'POST',
        body: JSON.stringify(task),
    }),

    // Actualizar tarea completa
    update: (id, task) => apiRequest(`/tasks/${id}`, {
        method: 'PUT',
        body: JSON.stringify(task),
    }),

    // Toggle estado completado
    toggle: (id) => apiRequest(`/tasks/${id}/toggle`, {
        method: 'PATCH',
    }),

    // Eliminar tarea
    delete: (id) => apiRequest(`/tasks/${id}`, {
        method: 'DELETE',
    }),
};

// Función para generar color aleatorio para nuevas tareas
export const generateRandomAccent = () => {
    const colors = [
        '#F15050', '#2baf2a', '#955FF9', '#EA3BC1',
        '#16bcc4', '#ecc100', '#ff6b6b', '#4ecdc4',
        '#45b7d1', '#f9ca24', '#f0932b', '#eb4d4b',
        '#6c5ce7', '#a29bfe', '#fd79a8', '#fdcb6e'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
};
