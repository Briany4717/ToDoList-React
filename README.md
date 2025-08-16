# TaskManager - React + TypeScript Todo App

Una aplicación moderna de gestión de tareas construida con React, TypeScript, Vite, y TailwindCSS.

## 🚀 Características

- ✅ **Gestión completa de tareas**: Crear, leer, actualizar y eliminar tareas
- 🎨 **Interfaz moderna**: Diseño limpio con TailwindCSS y Material Symbols
- ⚡ **TypeScript**: Tipado estático para mejor experiencia de desarrollo
- 🔍 **Búsqueda y filtrado**: Busca tareas por título o descripción
- 🎯 **Estados de tarea**: Separación entre tareas pendientes y completadas
- 🎨 **Colores personalizados**: Cada tarea tiene un color de acento único
- 📱 **Diseño responsivo**: Optimizado para diferentes tamaños de pantalla
- 🗄️ **Base de datos SQLite**: Persistencia de datos local
- 🔄 **API REST**: Backend Express con endpoints tipados

## 🛠️ Tecnologías

### Frontend
- **React 19** con hooks modernos
- **TypeScript** para tipado estático
- **Vite** como build tool
- **TailwindCSS** para estilos
- **Material Symbols** para iconografía
- **Lottie Animations** para efectos visuales

### Backend
- **Express.js** con TypeScript
- **Better-sqlite3** para base de datos
- **CORS** para comunicación cross-origin

## 📦 Instalación

1. **Clonar el repositorio**
   ```bash
   git clone [tu-repo-url]
   cd React-CRUD
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Iniciar en modo desarrollo**
   ```bash
   npm run dev:full
   ```
   Esto iniciará tanto el servidor backend (puerto 3001) como el frontend (puerto 5173)

## 🧩 Scripts Disponibles

- `npm run dev` - Inicia solo el frontend con Vite
- `npm run server` - Inicia solo el backend con tsx
- `npm run dev:full` - Inicia frontend y backend concurrentemente
- `npm run build` - Construye el proyecto para producción
- `npm run preview` - Vista previa de la build de producción
- `npm run type-check` - Verifica tipos sin compilar
- `npm run server:build` - Compila el servidor a JavaScript

## 📁 Estructura del Proyecto

```
src/
├── types.ts          # Definiciones de tipos TypeScript
├── api.ts            # Cliente API con tipos
├── App.tsx           # Componente principal
├── main.tsx          # Punto de entrada
├── TaskListItem.tsx  # Componente de elemento de tarea
├── CreationModal.tsx # Modal para crear tareas
├── Calendar.tsx      # Componente calendario (opcional)
└── assets/           # Recursos estáticos

server.ts             # Servidor Express con TypeScript
tsconfig.json         # Configuración TypeScript frontend
tsconfig.server.json  # Configuración TypeScript backend
```

## 🎯 API Endpoints

### Tareas
- `GET /api/tasks` - Obtener todas las tareas
- `GET /api/tasks/:id` - Obtener tarea específica
- `POST /api/tasks` - Crear nueva tarea
- `PUT /api/tasks/:id` - Actualizar tarea completa
- `PATCH /api/tasks/:id/toggle` - Toggle estado completado
- `DELETE /api/tasks/:id` - Eliminar tarea

## 🔧 Configuración TypeScript

El proyecto incluye dos configuraciones de TypeScript:

### Frontend (`tsconfig.json`)
- **Target**: ES2022
- **JSX**: react-jsx
- **Strict mode**: habilitado
- **Module**: ESNext con resolución Node

### Backend (`tsconfig.server.json`)
- **Target**: ES2022
- **Module**: CommonJS
- **Compilación**: hacia /dist

## 🎨 Características de UI

- **Animaciones suaves**: Transiciones CSS y Lottie
- **Colores dinámicos**: Sistema de acentos por tarea
- **Búsqueda en tiempo real**: Filtrado instantáneo
- **Estados visuales**: Indicadores claros de completado
- **Diseño adaptativo**: Mobile-first approach

## 🔄 Migración de JavaScript a TypeScript

Este proyecto fue migrado completamente de JavaScript a TypeScript incluyendo:

- ✅ Tipado de todos los componentes React
- ✅ Interfaces para datos y props
- ✅ Tipado del servidor Express
- ✅ Configuración de build actualizada
- ✅ Manejo de errores tipado
- ✅ API client con tipos genéricos

## 🚀 Despliegue

Para desplegar en producción:

1. **Frontend**:
   ```bash
   npm run build
   # Los archivos estarán en dist/
   ```

2. **Backend**:
   ```bash
   npm run server:build
   # El servidor compilado estará en dist/server.js
   ```

## 📝 Licencia

MIT License - ver archivo [LICENSE](LICENSE) para detalles.

## 🤝 Contribución

Las contribuciones son bienvenidas! Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

---

**Desarrollado con ❤️ y TypeScript**