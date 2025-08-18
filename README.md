# TaskManager: Aplicación de Lista de Tareas con React y TypeScript

Esta es una aplicación de gestión de tareas construida con React, TypeScript, Vite y TailwindCSS. Permite a los usuarios administrar sus tareas a través de una interfaz limpia y moderna, con un backend de Express que persiste los datos en una base de datos SQLite.

## Características Principales

- **Gestión de Tareas (CRUD)**: Funcionalidad completa para crear, leer, actualizar y eliminar tareas.
- **Interfaz Moderna**: Diseño estilizado con TailwindCSS y Material Symbols.
- **Tipado Estático con TypeScript**: Código robusto y mantenible.
- **Búsqueda y Filtrado**: Búsqueda por título o descripción y filtrado por estado (pendientes/completadas).
- **Persistencia de Datos**: Backend con Express.js y base de datos SQLite.
- **API RESTful**: Endpoints bien definidos para la comunicación entre el cliente y el servidor.

## Tecnologías Utilizadas

**Frontend:**

- React 19
- TypeScript
- Vite
- TailwindCSS
- Material Symbols
- Lottie para animaciones

**Backend:**

- Express.js
- TypeScript
- better-sqlite3
- CORS

## Instalación y Ejecución

Para ejecutar este proyecto localmente, sigue estos pasos:

1. **Clonar el repositorio:**

   ```bash
   git clone https://github.com/Briany4717/ToDoList-React.git
   cd ToDoList-React
   ```

2. **Instalar dependencias:**

   Asegúrate de tener Node.js instalado. Luego, ejecuta:

   ```bash
   npm install
   ```

3. **Iniciar el proyecto:**

   Para iniciar tanto el servidor de desarrollo de Vite como el backend de Express simultáneamente, usa:

   ```bash
   npm run dev:full
   ```

   - El frontend estará disponible en `http://localhost:5173`.
   - El backend estará escuchando en `http://localhost:3001`.

## Scripts Disponibles

- `npm run dev`: Inicia el servidor de desarrollo de Vite para el frontend.
- `npm run server`: Inicia el servidor de Express usando `tsx` para ejecución directa de TypeScript.
- `npm run dev:full`: Ejecuta los dos scripts anteriores de forma concurrente.
- `npm run build`: Compila el frontend para producción.
- `npm run preview`: Sirve la compilación de producción localmente.
- `npm run server:build`: Compila el código del servidor de TypeScript a JavaScript.
- `npm run lint`: Analiza el código en busca de errores de linting.
- `npm run format`: Formatea el código usando Prettier.

## Estructura del Proyecto

El proyecto está organizado de la siguiente manera:

```text
/
├── public/               # Archivos estáticos
├── src/                  # Código fuente del frontend
│   ├── api/              # Lógica de cliente API (config, client, services)
│   ├── assets/           # Imágenes, animaciones Lottie, etc.
│   ├── components/       # Componentes de React (features, layout, ui)
│   ├── constants/        # Constantes de la aplicación
│   ├── hooks/            # Hooks personalizados (useTasks, useUIState)
│   ├── styles/           # Archivos CSS globales
│   ├── utils/            # Funciones de utilidad
│   ├── App.tsx           # Componente raíz de la aplicación
│   ├── main.tsx          # Punto de entrada del frontend
│   └── types.ts          # Definiciones de tipos de TypeScript
├── server.ts             # Código del servidor Express
├── tasks.db              # Base de datos SQLite
├── package.json          # Dependencias y scripts del proyecto
└── vite.config.ts        # Configuración de Vite
```

## API Endpoints

La API del servidor expone los siguientes endpoints para la gestión de tareas:

- `GET /api/tasks`: Obtiene todas las tareas.
- `GET /api/tasks/:id`: Obtiene una tarea por su ID.
- `POST /api/tasks`: Crea una nueva tarea.
- `PUT /api/tasks/:id`: Actualiza una tarea existente.
- `PATCH /api/tasks/:id/toggle`: Cambia el estado de completado de una tarea.
- `DELETE /api/tasks/:id`: Elimina una tarea.

## Licencia

Este proyecto está bajo la Licencia Pública General de GNU v3.0. Consulta el archivo [LICENSE](LICENSE) para más detalles.
