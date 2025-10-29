import React, { useMemo, useState } from 'react';
import { CalendarProps } from '../../types';

interface DayInfo {
  day: number | null;
  tasksCount: number;
  completedCount: number;
  hasOverdueTasks: boolean;
  hasTodayTasks: boolean;
}

export const Calendar: React.FC<CalendarProps> = ({ onDateSelect, selectedDate, tasks }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'calendar' | 'stats'>('calendar');

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const today = useMemo(() => new Date(), []);

  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
  ];

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();
  const startingDayOfWeek = firstDayOfMonth.getDay();

  const adjustedStartingDay = startingDayOfWeek === 0 ? 6 : startingDayOfWeek - 1;

  // Calcular información de tareas por día
  const dayTasksInfo = useMemo(() => {
    const info: Map<number, DayInfo> = new Map();

    for (let day = 1; day <= daysInMonth; day++) {
      const dayDate = new Date(currentYear, currentMonth, day);
      const normalizedDayDate = new Date(dayDate.getFullYear(), dayDate.getMonth(), dayDate.getDate());
      const normalizedToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());

      const dayTasks = tasks.filter(task => {
        if (!task.dueDate) return false;
        const taskDate = new Date(task.dueDate);
        const normalizedTaskDate = new Date(taskDate.getFullYear(), taskDate.getMonth(), taskDate.getDate());
        return normalizedTaskDate.getTime() === normalizedDayDate.getTime();
      });

      const completedCount = dayTasks.filter(t => t.isCompleted).length;
      const hasOverdue = normalizedDayDate < normalizedToday && dayTasks.some(t => !t.isCompleted);
      const isToday = normalizedDayDate.getTime() === normalizedToday.getTime();

      info.set(day, {
        day,
        tasksCount: dayTasks.length,
        completedCount,
        hasOverdueTasks: hasOverdue,
        hasTodayTasks: isToday && dayTasks.length > 0,
      });
    }

    return info;
  }, [tasks, currentMonth, currentYear, daysInMonth, today]);

  // Estadísticas del mes
  const monthStats = useMemo(() => {
    const monthTasks = tasks.filter(task => {
      if (!task.dueDate) return false;
      const taskDate = new Date(task.dueDate);
      return taskDate.getMonth() === currentMonth && taskDate.getFullYear() === currentYear;
    });

    return {
      total: monthTasks.length,
      completed: monthTasks.filter(t => t.isCompleted).length,
      pending: monthTasks.filter(t => !t.isCompleted).length,
      daysWithTasks: new Set(monthTasks.map(t => new Date(t.dueDate!).getDate())).size,
    };
  }, [tasks, currentMonth, currentYear]);

  const goToPreviousMonth = (): void => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const goToNextMonth = (): void => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const goToToday = (): void => {
    setCurrentDate(new Date());
    onDateSelect(new Date());
  };

  const generateCalendarDays = (): (number | null)[] => {
    const days: (number | null)[] = [];

    for (let i = 0; i < adjustedStartingDay; i++) {
      days.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  };

  const calendarDays = generateCalendarDays();

  const isPast = (day: number | null): boolean => {
    if (!day) return false;
    const dayDate = new Date(currentYear, currentMonth, day);
    const normalizedDay = new Date(dayDate.getFullYear(), dayDate.getMonth(), dayDate.getDate());
    const normalizedToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return normalizedDay < normalizedToday;
  };

  const isToday = (day: number | null): boolean => {
    if (!day) return false;
    return (
      today.getDate() === day &&
      today.getMonth() === currentMonth &&
      today.getFullYear() === currentYear
    );
  };

  const isSelected = (day: number | null): boolean => {
    if (!selectedDate || !day) return false;
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === currentMonth &&
      selectedDate.getFullYear() === currentYear
    );
  };

  const handleDayClick = (day: number | null): void => {
    if (!day) return;

    const clickedDate = new Date(currentYear, currentMonth, day);

    // Si se clickea el mismo día, deseleccionar
    if (isSelected(day)) {
      onDateSelect(null);
    } else {
      onDateSelect(clickedDate);
    }
  };

  const toggleViewMode = (): void => {
    setViewMode(prev => prev === 'calendar' ? 'stats' : 'calendar');
  };

  const renderDayIndicator = (day: number | null) => {
    if (!day) return null;

    const info = dayTasksInfo.get(day);
    if (!info || info.tasksCount === 0) return null;

    const allCompleted = info.tasksCount === info.completedCount;
    const hasIncomplete = info.tasksCount > info.completedCount;

    return (
      <div className="absolute bottom-0.5 left-1/2 transform -translate-x-1/2 flex gap-0.5">
        {info.hasOverdueTasks ? (
          <div className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse"
               title="Tareas vencidas" />
        ) : allCompleted ? (
          <div className="h-1.5 w-1.5 rounded-full bg-green-500"
               title="Todas completadas" />
        ) : hasIncomplete ? (
          <div className="h-1.5 w-1.5 rounded-full bg-yellow-500"
               title="Tareas pendientes" />
        ) : null}
      </div>
    );
  };

  if (viewMode === 'stats') {
    return (
      <div className='flex flex-col h-min items-center p-6 rounded-lg mt-auto min-w-80 bg-white shadow-sm border border-gray-300'>
        <div className='flex items-center justify-between w-full mb-4'>
          <button
            onClick={toggleViewMode}
            className='material-symbols-rounded cursor-pointer hover:text-blue-400 transition-colors duration-200 text-2xl p-1 rounded hover:bg-gray-100'
            type='button'
            aria-label='Ver calendario'
          >
            calendar_month
          </button>
          <h3 className='cursor-default text-xl font-semibold text-gray-800'>
            Estadísticas
          </h3>
          <button
            onClick={goToToday}
            className='text-sm px-3 py-1 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200'
            type='button'
          >
            Hoy
          </button>
        </div>

        <div className='w-full space-y-3'>
          <div className='text-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg'>
            <h4 className='text-sm text-gray-600 mb-1'>
              {monthNames[currentMonth]} {currentYear}
            </h4>
            <p className='text-3xl font-bold text-blue-600'>{monthStats.total}</p>
            <p className='text-xs text-gray-500'>Total de tareas</p>
          </div>

          <div className='grid grid-cols-2 gap-3'>
            <div className='p-3 bg-green-50 rounded-lg text-center'>
              <p className='text-2xl font-bold text-green-600'>{monthStats.completed}</p>
              <p className='text-xs text-gray-600'>Completadas</p>
            </div>
            <div className='p-3 bg-yellow-50 rounded-lg text-center'>
              <p className='text-2xl font-bold text-yellow-600'>{monthStats.pending}</p>
              <p className='text-xs text-gray-600'>Pendientes</p>
            </div>
          </div>

          <div className='p-3 bg-purple-50 rounded-lg text-center'>
            <p className='text-2xl font-bold text-purple-600'>{monthStats.daysWithTasks}</p>
            <p className='text-xs text-gray-600'>Días con tareas</p>
          </div>

          {monthStats.total > 0 && (
            <div className='p-3 bg-gray-50 rounded-lg'>
              <div className='flex justify-between mb-1'>
                <span className='text-xs text-gray-600'>Progreso</span>
                <span className='text-xs font-semibold text-gray-800'>
                  {Math.round((monthStats.completed / monthStats.total) * 100)}%
                </span>
              </div>
              <div className='w-full bg-gray-200 rounded-full h-2'>
                <div
                  className='bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all duration-500'
                  style={{ width: `${(monthStats.completed / monthStats.total) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className='flex flex-col h-min items-center p-6 rounded-lg mt-auto min-w-80 bg-white shadow-sm border border-gray-300'>
      <div className='flex items-center justify-between w-full mb-4'>
        <button
          onClick={goToPreviousMonth}
          className='material-symbols-rounded cursor-pointer hover:text-blue-400 transition-colors duration-200 text-2xl p-1 rounded hover:bg-gray-100'
          type='button'
          aria-label='Mes anterior'
        >
          chevron_left
        </button>
        <h3 className='cursor-default text-xl font-semibold text-gray-800'>
          {monthNames[currentMonth]} {currentYear}
        </h3>
        <button
          onClick={goToNextMonth}
          className='material-symbols-rounded cursor-pointer hover:text-blue-400 transition-colors duration-200 text-2xl p-1 rounded hover:bg-gray-100'
          type='button'
          aria-label='Mes siguiente'
        >
          chevron_right
        </button>
      </div>

      <div className='flex gap-2 mb-3 w-full'>
        <button
          onClick={goToToday}
          className='flex-1 text-xs px-3 py-1.5 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200 font-medium'
          type='button'
        >
          Ir a Hoy
        </button>
        <button
          onClick={toggleViewMode}
          className='flex-1 text-xs px-3 py-1.5 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors duration-200 font-medium flex items-center justify-center gap-1'
          type='button'
        >
          <span className='material-symbols-rounded text-sm'>bar_chart</span>
          Stats
        </button>
        {selectedDate && (
          <button
            onClick={() => onDateSelect(null)}
            className='flex-1 text-xs px-3 py-1.5 rounded-full bg-red-100 text-red-700 hover:bg-red-200 transition-colors duration-200 font-medium'
            type='button'
          >
            Limpiar
          </button>
        )}
      </div>

      <div className='grid grid-cols-7 gap-2 mb-2 w-full'>
        {['LUN', 'MAR', 'MIE', 'JUE', 'VIE', 'SAB', 'DOM'].map((day) => (
          <div key={day} className='text-center text-xs text-gray-600 font-medium p-1'>
            {day}
          </div>
        ))}
      </div>

      <div className='grid grid-cols-7 gap-2 w-full'>
        {calendarDays.map((day, index) => {
          const info = day ? dayTasksInfo.get(day) : null;

          return (
            <button
              key={index}
              onClick={() => handleDayClick(day)}
              disabled={!day}
              className={`
                relative h-10 w-10 flex items-center justify-center text-sm rounded-lg
                transition-all duration-200 font-medium
                ${day ? 'cursor-pointer hover:scale-110' : 'cursor-default'}
                ${isPast(day) && !isToday(day) ? 'opacity-50' : ''}
                ${day && isToday(day)
                  ? 'bg-blue-500 text-white font-bold hover:bg-blue-600 ring-2 ring-blue-300 shadow-md'
                  : ''}
                ${day && isSelected(day) && !isToday(day)
                  ? 'bg-green-500 text-white font-bold hover:bg-green-600 ring-2 ring-green-300 shadow-md'
                  : ''}
                ${day && !isToday(day) && !isSelected(day)
                  ? info?.tasksCount
                    ? 'text-gray-900 bg-gray-100 hover:bg-gray-200 hover:text-gray-900'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  : ''}
                disabled:cursor-default disabled:hover:scale-100 disabled:hover:bg-transparent
              `}
              type='button'
              aria-label={day ? `Día ${day}${info?.tasksCount ? ` - ${info.tasksCount} tarea(s)` : ''}` : undefined}
              title={day && info?.tasksCount
                ? `${info.tasksCount} tarea(s): ${info.completedCount} completada(s), ${info.tasksCount - info.completedCount} pendiente(s)`
                : undefined}
            >
              {day}
              {renderDayIndicator(day)}
            </button>
          );
        })}
      </div>

      {/* Leyenda */}
      <div className='flex flex-wrap gap-3 mt-4 pt-3 border-t border-gray-200 w-full text-xs'>
        <div className='flex items-center gap-1.5'>
          <div className='h-2 w-2 rounded-full bg-green-500' />
          <span className='text-gray-600'>Completadas</span>
        </div>
        <div className='flex items-center gap-1.5'>
          <div className='h-2 w-2 rounded-full bg-yellow-500' />
          <span className='text-gray-600'>Pendientes</span>
        </div>
        <div className='flex items-center gap-1.5'>
          <div className='h-2 w-2 rounded-full bg-red-500 animate-pulse' />
          <span className='text-gray-600'>Vencidas</span>
        </div>
      </div>
    </div>
  );
};
