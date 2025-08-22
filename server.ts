import Database from 'better-sqlite3';
import cors from 'cors';
import express, { Application, Request, Response } from 'express';

interface Task {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
  accent: string;
  createdAt: string;
  dueDate: string;
}

interface CreateTaskRequest {
  title: string;
  description?: string;
  accent?: string;
  dueDate?: string;
}

interface UpdateTaskRequest {
  title: string;
  description?: string;
  isCompleted?: boolean;
  accent?: string;
  dueDate?: string;
}

const app: Application = express();
const PORT: number = 3001;

app.use(cors());
app.use(express.json());

const db = new Database('tasks.db');

db.exec(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    isCompleted BOOLEAN DEFAULT 0,
    accent TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    dueDate DATETIME
  )
`);

const insertInitialData = (): void => {
  const count = db.prepare('SELECT COUNT(*) as count FROM tasks').get() as { count: number };
  if (count.count === 0) {
    const insert = db.prepare(`
      INSERT INTO tasks (title, description, isCompleted, accent, dueDate)
      VALUES (?, ?, ?, ?, ?)
    `);

    const initialTasks = [
      // Trabajo y Productividad
      ['Revisar emails matutinos', 'Procesar bandeja de entrada y responder emails importantes', 0, '#4A90E2', new Date(new Date().setDate(new Date().getDate() + 1)).toISOString()],
      ['Preparar presentación Q3', 'Crear slides para review trimestral con métricas de ventas', 0, '#50C878', new Date(new Date().setDate(new Date().getDate() + 2)).toISOString()],
      ['Llamada con cliente', 'Reunion con equipo de marketing de TechCorp sobre nueva campaña', 0, '#FF6B6B', new Date(new Date().setDate(new Date().getDate() + 3)).toISOString()],
      ['Actualizar CV', 'Añadir nuevas skills y proyectos completados este año', 0, '#9B59B6', new Date(new Date().setDate(new Date().getDate() + 4)).toISOString()],
      ['Backup de archivos', 'Respaldar documentos importantes en drive y disco externo', 0, '#F39C12', new Date(new Date().setDate(new Date().getDate() + 5)).toISOString()],

      // Estudio y Aprendizaje
      ['Curso de React avanzado', 'Completar módulo de hooks personalizados y context API', 0, '#3498DB', new Date(new Date().setDate(new Date().getDate() + 1)).toISOString()],
      ['Leer "Clean Code"', 'Avanzar capítulos 4-6 sobre funciones y comentarios', 0, '#E74C3C', new Date(new Date().setDate(new Date().getDate() + 2)).toISOString()],
      ['Práctica de algoritmos', 'Resolver 5 problemas de LeetCode nivel medio', 0, '#2ECC71', new Date(new Date().setDate(new Date().getDate() + 3)).toISOString()],
      ['Estudiar para certificación', 'Repasar AWS Solutions Architect material de estudio', 0, '#F1C40F', new Date(new Date().setDate(new Date().getDate() + 4)).toISOString()],
      ['Webinar de diseño UX', 'Asistir a conferencia online sobre principios de usabilidad', 0, '#8E44AD', new Date(new Date().setDate(new Date().getDate() + 5)).toISOString()],

      // Salud y Bienestar
      ['Rutina de ejercicio', 'Completar 45 min de cardio y 30 min de fuerza en el gym', 0, '#FF4757', new Date(new Date().setDate(new Date().getDate() + 1)).toISOString()],
      ['Consulta médica', 'Cita de control general y chequeo de presión arterial', 0, '#2ED573', new Date(new Date().setDate(new Date().getDate() + 2)).toISOString()],
      ['Meditación matutina', 'Sesión de 15 minutos de mindfulness antes del desayuno', 0, '#A4B0BE', new Date(new Date().setDate(new Date().getDate() + 3)).toISOString()],
      ['Preparar almuerzo saludable', 'Cocinar ensalada de quinoa con verduras y proteína', 0, '#27AE60', new Date(new Date().setDate(new Date().getDate() + 4)).toISOString()],
      ['Caminar 10,000 pasos', 'Completar meta diaria de actividad física registrada en app', 0, '#FF9F43', new Date(new Date().setDate(new Date().getDate() + 5)).toISOString()],

      // Hogar y Familia
      ['Limpiar garaje', 'Organizar herramientas y donar objetos que ya no uso', 0, '#FF6B35', new Date(new Date().setDate(new Date().getDate() + 1)).toISOString()],
      ['Planificar fin de semana', 'Coordinar actividades familiares y reservas necesarias', 0, '#4834D4', new Date(new Date().setDate(new Date().getDate() + 2)).toISOString()],
      ['Reparar grifo cocina', 'Cambiar empaques y ajustar presión del agua', 0, '#FF3838', new Date(new Date().setDate(new Date().getDate() + 3)).toISOString()],
      ['Compra del mes', 'Lista completa de supermercado y productos de limpieza', 0, '#00D2D3', new Date(new Date().setDate(new Date().getDate() + 4)).toISOString()],
      ['Llamar a mamá', 'Ponerse al día con familia y planificar visita del próximo mes', 0, '#FF6348', new Date(new Date().setDate(new Date().getDate() + 5)).toISOString()],

      // Finanzas Personales
      ['Revisar gastos del mes', 'Categorizar transacciones bancarias y actualizar presupuesto', 0, '#2F3542', new Date(new Date().setDate(new Date().getDate() + 1)).toISOString()],
      ['Pagar facturas pendientes', 'Electricidad, internet, seguro del carro y tarjeta de crédito', 0, '#FF4757', new Date(new Date().setDate(new Date().getDate() + 2)).toISOString()],
      ['Investigar inversiones', 'Comparar opciones de fondos indexados para ahorro a largo plazo', 0, '#3742FA', new Date(new Date().setDate(new Date().getDate() + 3)).toISOString()],
      ['Declaración de impuestos', 'Reunir documentos y citas con contador para próxima declaración', 0, '#2ED573', new Date(new Date().setDate(new Date().getDate() + 4)).toISOString()],
      ['Ahorro de emergencia', 'Transferir 15% del sueldo a cuenta de ahorros separada', 0, '#FFA502', new Date(new Date().setDate(new Date().getDate() + 5)).toISOString()],

      // Creatividad y Hobbies
      ['Practicar guitarra', 'Aprender acordes de "Wonderwall" y mejorar transiciones', 0, '#8E44AD', new Date(new Date().setDate(new Date().getDate() + 1)).toISOString()],
      ['Escribir en blog personal', 'Redactar post sobre experiencias con nuevas tecnologías', 0, '#E74C3C', new Date(new Date().setDate(new Date().getDate() + 2)).toISOString()],
      ['Pintar cuadro paisaje', 'Continuar obra de montañas con técnica de acuarela', 0, '#3498DB', new Date(new Date().setDate(new Date().getDate() + 3)).toISOString()],
      ['Clase de cocina italiana', 'Aprender a hacer pasta fresca y salsa carbonara auténtica', 0, '#27AE60', new Date(new Date().setDate(new Date().getDate() + 4)).toISOString()],
      ['Fotografía urbana', 'Sesión de street photography en el centro histórico', 0, '#F39C12', new Date(new Date().setDate(new Date().getDate() + 5)).toISOString()],

      // Tecnología y Proyectos
      ['Configurar home server', 'Instalar Plex y configurar NAS para streaming multimedia', 0, '#2C2C54', new Date(new Date().setDate(new Date().getDate() + 1)).toISOString()],
      ['Actualizar portfolio', 'Subir 3 proyectos nuevos y mejorar diseño responsive', 0, '#40407A', new Date(new Date().setDate(new Date().getDate() + 2)).toISOString()],
      ['Optimizar velocidad web', 'Comprimir imágenes y implementar lazy loading en sitio', 0, '#706FD3', new Date(new Date().setDate(new Date().getDate() + 3)).toISOString()],
      ['Backup automático', 'Configurar script de respaldo automático para proyectos', 0, '#FF5252', new Date(new Date().setDate(new Date().getDate() + 4)).toISOString()],
      ['Aprender Docker', 'Completar tutorial oficial y containerizar app personal', 0, '#33D9B2', new Date(new Date().setDate(new Date().getDate() + 5)).toISOString()],

      // Social y Networking
      ['Actualizar perfil LinkedIn', 'Añadir descripción profesional y nuevas recomendaciones', 0, '#0077B5', new Date(new Date().setDate(new Date().getDate() + 1)).toISOString()],
      ['Reunión de ex-compañeros', 'Organizar cena mensual del grupo de universidad', 0, '#FF6B6B', new Date(new Date().setDate(new Date().getDate() + 2)).toISOString()],
      ['Conferencia tech local', 'Asistir a meetup de desarrolladores JavaScript', 0, '#F7B731', new Date(new Date().setDate(new Date().getDate() + 3)).toISOString()],
      ['Networking coffee', 'Café con contacto de la industria para explorar oportunidades', 0, '#5F27CD', new Date(new Date().setDate(new Date().getDate() + 4)).toISOString()],
      ['Mentor junior developer', 'Sesión semanal de code review y consejos de carrera', 0, '#00D2D3', new Date(new Date().setDate(new Date().getDate() + 5)).toISOString()],

      // Viajes y Experiencias
      ['Planificar vacaciones verano', 'Investigar destinos, precios y fechas disponibles', 0, '#FF9FF3', new Date(new Date().setDate(new Date().getDate() + 1)).toISOString()],
      ['Renovar pasaporte', 'Cita en oficina gubernamental y reunir documentación necesaria', 0, '#54A0FF', new Date(new Date().setDate(new Date().getDate() + 2)).toISOString()],
      ['Curso de idiomas', 'Práctica conversacional de francés con app y videos', 0, '#5F27CD', new Date(new Date().setDate(new Date().getDate() + 3)).toISOString()],
      ['Explorar ciudad', 'Visitar museo nuevo y probar restaurante recomendado', 0, '#FF6B35', new Date(new Date().setDate(new Date().getDate() + 4)).toISOString()],

      // Mantenimiento y Organización
      ['Organizar closet', 'Separar ropa por temporada y donar piezas sin usar', 0, '#A55EEA', new Date(new Date().setDate(new Date().getDate() + 1)).toISOString()],
      ['Revisar suscripciones', 'Cancelar servicios no utilizados y optimizar gastos mensuales', 0, '#26DE81', new Date(new Date().setDate(new Date().getDate() + 2)).toISOString()],
      ['Mantenimiento carro', 'Cambio de aceite, revisión de frenos y alineación', 0, '#FD79A8', new Date(new Date().setDate(new Date().getDate() + 3)).toISOString()],
      ['Actualizar apps móvil', 'Instalar actualizaciones pendientes y revisar permisos', 0, '#FDCB6E', new Date(new Date().setDate(new Date().getDate() + 4)).toISOString()],
      ['Limpiar computadora', 'Eliminar archivos temporales y desfragmentar disco duro', 0, '#6C5CE7', new Date(new Date().setDate(new Date().getDate() + 5)).toISOString()]
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

const getAllTasks = db.prepare('SELECT * FROM tasks ORDER BY createdAt DESC');
const getTaskById = db.prepare('SELECT * FROM tasks WHERE id = ?');
const insertTask = db.prepare(`
  INSERT INTO tasks (title, description, isCompleted, accent, dueDate)
  VALUES (?, ?, ?, ?, ?)
`);
const updateTask = db.prepare(`
  UPDATE tasks
  SET title = ?, description = ?, isCompleted = ?, accent = ?, dueDate = ?
  WHERE id = ?
`);
const deleteTask = db.prepare('DELETE FROM tasks WHERE id = ?');
const toggleTask = db.prepare('UPDATE tasks SET isCompleted = ? WHERE id = ?');


app.get('/api/tasks', (req: Request, res: Response) => {
  try {
    const tasks = getAllTasks.all() as Task[];
    const formattedTasks = tasks.map((task: Task) => ({
      ...task,
      isCompleted: Boolean(task.isCompleted)
    }));
    res.json(formattedTasks);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});


app.get('/api/tasks/:id', (req: Request, res: Response) => {
  try {
    const task = getTaskById.get(req.params.id) as Task | undefined;
    if (!task) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }
    res.json({
      ...task,
      isCompleted: Boolean(task.isCompleted)
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});


app.post('/api/tasks', (req: Request, res: Response) => {
  try {
    const { title, description = '', accent = '#87a1fd', dueDate}: CreateTaskRequest = req.body;

    if (!title || title.trim() === '') {
      return res.status(400).json({ error: 'El título es requerido' });
    }

    const result = insertTask.run(title.trim(), description.trim(), 0, accent, dueDate);
    const newTask = getTaskById.get(result.lastInsertRowid) as Task;

    res.status(201).json({
      ...newTask,
      isCompleted: Boolean(newTask.isCompleted)
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/tasks/:id', (req: Request, res: Response) => {
  try {
    const { title, description, isCompleted, accent, dueDate }: UpdateTaskRequest = req.body;
    const id: string = req.params.id;

    if (!title || title.trim() === '') {
      return res.status(400).json({ error: 'El título es requerido' });
    }

    const result = updateTask.run(
      title.trim(),
      description || '',
      isCompleted ? 1 : 0,
      accent || '#87a1fd',
      dueDate,
      id
    );

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    const updatedTask = getTaskById.get(id) as Task;
    res.json({
      ...updatedTask,
      isCompleted: Boolean(updatedTask.isCompleted)
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.patch('/api/tasks/:id/toggle', (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;
    const currentTask = getTaskById.get(id) as Task | undefined;

    if (!currentTask) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    const newCompleted = !currentTask.isCompleted;
    const result = toggleTask.run(newCompleted ? 1 : 0, id);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    const updatedTask = getTaskById.get(id) as Task;
    res.json({
      ...updatedTask,
      isCompleted: Boolean(updatedTask.isCompleted)
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/tasks/:id', (req: Request, res: Response) => {
  try {
    const result = deleteTask.run(req.params.id);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    res.json({ message: 'Tarea eliminada correctamente' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.use('*', (req: Request, res: Response) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📊 Base de datos: tasks.db`);
});

process.on('exit', () => db.close());
process.on('SIGHUP', () => process.exit(128 + 1));
process.on('SIGINT', () => process.exit(128 + 2));
process.on('SIGTERM', () => process.exit(128 + 15));
