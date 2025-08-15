const express = require('express');
const Database = require('better-sqlite3');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Inicializar base de datos
const db = new Database('tasks.db');

// Crear tabla si no existe
db.exec(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    isCompleted BOOLEAN DEFAULT 0,
    accent TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// Insertar datos de ejemplo si la tabla está vacía
const insertInitialData = () => {
  const count = db.prepare('SELECT COUNT(*) as count FROM tasks').get();
  if (count.count === 0) {
    const insert = db.prepare(`
      INSERT INTO tasks (title, description, isCompleted, accent) 
      VALUES (?, ?, ?, ?)
    `);

    const initialTasks = [
      // Trabajo y Productividad
      ['Revisar emails matutinos', 'Procesar bandeja de entrada y responder emails importantes', 0, '#4A90E2'],
      ['Preparar presentación Q3', 'Crear slides para review trimestral con métricas de ventas', 0, '#50C878'],
      ['Llamada con cliente', 'Reunion con equipo de marketing de TechCorp sobre nueva campaña', 0, '#FF6B6B'],
      ['Actualizar CV', 'Añadir nuevas skills y proyectos completados este año', 0, '#9B59B6'],
      ['Backup de archivos', 'Respaldar documentos importantes en drive y disco externo', 0, '#F39C12'],

      // Estudio y Aprendizaje
      ['Curso de React avanzado', 'Completar módulo de hooks personalizados y context API', 0, '#3498DB'],
      ['Leer "Clean Code"', 'Avanzar capítulos 4-6 sobre funciones y comentarios', 0, '#E74C3C'],
      ['Práctica de algoritmos', 'Resolver 5 problemas de LeetCode nivel medio', 0, '#2ECC71'],
      ['Estudiar para certificación', 'Repasar AWS Solutions Architect material de estudio', 0, '#F1C40F'],
      ['Webinar de diseño UX', 'Asistir a conferencia online sobre principios de usabilidad', 0, '#8E44AD'],

      // Salud y Bienestar
      ['Rutina de ejercicio', 'Completar 45 min de cardio y 30 min de fuerza en el gym', 0, '#FF4757'],
      ['Consulta médica', 'Cita de control general y chequeo de presión arterial', 0, '#2ED573'],
      ['Meditación matutina', 'Sesión de 15 minutos de mindfulness antes del desayuno', 0, '#A4B0BE'],
      ['Preparar almuerzo saludable', 'Cocinar ensalada de quinoa con verduras y proteína', 0, '#27AE60'],
      ['Caminar 10,000 pasos', 'Completar meta diaria de actividad física registrada en app', 0, '#FF9F43'],

      // Hogar y Familia
      ['Limpiar garaje', 'Organizar herramientas y donar objetos que ya no uso', 0, '#FF6B35'],
      ['Planificar fin de semana', 'Coordinar actividades familiares y reservas necesarias', 0, '#4834D4'],
      ['Reparar grifo cocina', 'Cambiar empaques y ajustar presión del agua', 0, '#FF3838'],
      ['Compra del mes', 'Lista completa de supermercado y productos de limpieza', 0, '#00D2D3'],
      ['Llamar a mamá', 'Ponerse al día con familia y planificar visita del próximo mes', 0, '#FF6348'],

      // Finanzas Personales
      ['Revisar gastos del mes', 'Categorizar transacciones bancarias y actualizar presupuesto', 0, '#2F3542'],
      ['Pagar facturas pendientes', 'Electricidad, internet, seguro del carro y tarjeta de crédito', 0, '#FF4757'],
      ['Investigar inversiones', 'Comparar opciones de fondos indexados para ahorro a largo plazo', 0, '#3742FA'],
      ['Declaración de impuestos', 'Reunir documentos y citas con contador para próxima declaración', 0, '#2ED573'],
      ['Ahorro de emergencia', 'Transferir 15% del sueldo a cuenta de ahorros separada', 0, '#FFA502'],

      // Creatividad y Hobbies
      ['Practicar guitarra', 'Aprender acordes de "Wonderwall" y mejorar transiciones', 0, '#8E44AD'],
      ['Escribir en blog personal', 'Redactar post sobre experiencias con nuevas tecnologías', 0, '#E74C3C'],
      ['Pintar cuadro paisaje', 'Continuar obra de montañas con técnica de acuarela', 0, '#3498DB'],
      ['Clase de cocina italiana', 'Aprender a hacer pasta fresca y salsa carbonara auténtica', 0, '#27AE60'],
      ['Fotografía urbana', 'Sesión de street photography en el centro histórico', 0, '#F39C12'],

      // Tecnología y Proyectos
      ['Configurar home server', 'Instalar Plex y configurar NAS para streaming multimedia', 0, '#2C2C54'],
      ['Actualizar portfolio', 'Subir 3 proyectos nuevos y mejorar diseño responsive', 0, '#40407A'],
      ['Optimizar velocidad web', 'Comprimir imágenes y implementar lazy loading en sitio', 0, '#706FD3'],
      ['Backup automático', 'Configurar script de respaldo automático para proyectos', 0, '#FF5252'],
      ['Aprender Docker', 'Completar tutorial oficial y containerizar app personal', 0, '#33D9B2'],

      // Social y Networking
      ['Actualizar perfil LinkedIn', 'Añadir descripción profesional y nuevas recomendaciones', 0, '#0077B5'],
      ['Reunión de ex-compañeros', 'Organizar cena mensual del grupo de universidad', 0, '#FF6B6B'],
      ['Conferencia tech local', 'Asistir a meetup de desarrolladores JavaScript', 0, '#F7B731'],
      ['Networking coffee', 'Café con contacto de la industria para explorar oportunidades', 0, '#5F27CD'],
      ['Mentor junior developer', 'Sesión semanal de code review y consejos de carrera', 0, '#00D2D3'],

      // Viajes y Experiencias
      ['Planificar vacaciones verano', 'Investigar destinos, precios y fechas disponibles', 0, '#FF9FF3'],
      ['Renovar pasaporte', 'Cita en oficina gubernamental y reunir documentación necesaria', 0, '#54A0FF'],
      ['Curso de idiomas', 'Práctica conversacional de francés con app y videos', 0, '#5F27CD'],
      ['Explorar ciudad', 'Visitar museo nuevo y probar restaurante recomendado', 0, '#FF6B35'],

      // Mantenimiento y Organización
      ['Organizar closet', 'Separar ropa por temporada y donar piezas sin usar', 0, '#A55EEA'],
      ['Revisar suscripciones', 'Cancelar servicios no utilizados y optimizar gastos mensuales', 0, '#26DE81'],
      ['Mantenimiento carro', 'Cambio de aceite, revisión de frenos y alineación', 0, '#FD79A8'],
      ['Actualizar apps móvil', 'Instalar actualizaciones pendientes y revisar permisos', 0, '#FDCB6E'],
      ['Limpiar computadora', 'Eliminar archivos temporales y desfragmentar disco duro', 0, '#6C5CE7']
    ];

    const insertMany = db.transaction((tasks) => {
      for (const task of tasks) {
        insert.run(...task);
      }
    });

    insertMany(initialTasks);
    console.log('✅ Datos iniciales insertados');
  }
};

insertInitialData();

// Preparar queries
const getAllTasks = db.prepare('SELECT * FROM tasks ORDER BY createdAt DESC');
const getTaskById = db.prepare('SELECT * FROM tasks WHERE id = ?');
const insertTask = db.prepare(`
  INSERT INTO tasks (title, description, isCompleted, accent) 
  VALUES (?, ?, ?, ?)
`);
const updateTask = db.prepare(`
  UPDATE tasks 
  SET title = ?, description = ?, isCompleted = ?, accent = ? 
  WHERE id = ?
`);
const deleteTask = db.prepare('DELETE FROM tasks WHERE id = ?');
const toggleTask = db.prepare('UPDATE tasks SET isCompleted = ? WHERE id = ?');

// Rutas API

// GET /api/tasks - Obtener todas las tareas
app.get('/api/tasks', (req, res) => {
  try {
    const tasks = getAllTasks.all().map(task => ({
      ...task,
      isCompleted: Boolean(task.isCompleted)
    }));
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/tasks/:id - Obtener una tarea específica
app.get('/api/tasks/:id', (req, res) => {
  try {
    const task = getTaskById.get(req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }
    res.json({
      ...task,
      isCompleted: Boolean(task.isCompleted)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/tasks - Crear nueva tarea
app.post('/api/tasks', (req, res) => {
  try {
    const { title, description = '', accent = '#87a1fd' } = req.body;

    if (!title || title.trim() === '') {
      return res.status(400).json({ error: 'El título es requerido' });
    }

    const result = insertTask.run(title.trim(), description.trim(), 0, accent);
    const newTask = getTaskById.get(result.lastInsertRowid);

    res.status(201).json({
      ...newTask,
      isCompleted: Boolean(newTask.isCompleted)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/tasks/:id - Actualizar tarea completa
app.put('/api/tasks/:id', (req, res) => {
  try {
    const { title, description, isCompleted, accent } = req.body;
    const id = req.params.id;

    if (!title || title.trim() === '') {
      return res.status(400).json({ error: 'El título es requerido' });
    }

    const result = updateTask.run(
      title.trim(),
      description || '',
      isCompleted ? 1 : 0,
      accent || '#87a1fd',
      id
    );

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    const updatedTask = getTaskById.get(id);
    res.json({
      ...updatedTask,
      isCompleted: Boolean(updatedTask.isCompleted)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PATCH /api/tasks/:id/toggle - Toggle estado completado
app.patch('/api/tasks/:id/toggle', (req, res) => {
  try {
    const id = req.params.id;
    const currentTask = getTaskById.get(id);

    if (!currentTask) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    const newCompleted = !Boolean(currentTask.isCompleted);
    const result = toggleTask.run(newCompleted ? 1 : 0, id);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    const updatedTask = getTaskById.get(id);
    res.json({
      ...updatedTask,
      isCompleted: Boolean(updatedTask.isCompleted)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/tasks/:id - Eliminar tarea
app.delete('/api/tasks/:id', (req, res) => {
  try {
    const result = deleteTask.run(req.params.id);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    res.json({ message: 'Tarea eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Manejo de errores 404
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📊 Base de datos: tasks.db`);
});

// Cerrar DB al terminar proceso
process.on('exit', () => db.close());
process.on('SIGHUP', () => process.exit(128 + 1));
process.on('SIGINT', () => process.exit(128 + 2));
process.on('SIGTERM', () => process.exit(128 + 15));
