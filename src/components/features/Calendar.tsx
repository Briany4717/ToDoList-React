import React, { useState } from 'react';
import { CalendarProps } from '../../types';

export const Calendar: React.FC<CalendarProps> = ({ onDateSelect, selectedDate }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const today = new Date();

  const monthNames = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();
  const startingDayOfWeek = firstDayOfMonth.getDay();

  const adjustedStartingDay = startingDayOfWeek === 0 ? 6 : startingDayOfWeek - 1;

  const goToPreviousMonth = (): void => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const goToNextMonth = (): void => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
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
    return (
      (today.getDate() > day &&
        today.getMonth() === currentMonth &&
        today.getFullYear() === currentYear) ||
      (today.getMonth() > currentMonth && today.getFullYear() === currentYear) ||
      today.getFullYear() > currentYear
    );
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
    if (day && onDateSelect) {
      const newSelectedDate = new Date(currentYear, currentMonth, day);
      onDateSelect(newSelectedDate);
    }
  };

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

      <div className='grid grid-cols-7 gap-2 mb-2 w-full'>
        {['LUN', 'MAR', 'MIE', 'JUE', 'VIE', 'SAB', 'DOM'].map((day) => (
          <div key={day} className='text-center text-sm text-gray-900 font-medium p-2'>
            {day}
          </div>
        ))}
      </div>

      <div className='grid grid-cols-7 gap-2 w-full'>
        {calendarDays.map((day, index) => (
          <button
            key={index}
            onClick={() => handleDayClick(day)}
            disabled={!day}
            className={`
                            h-10 w-10 flex items-center justify-center text-sm rounded-lg transition-all duration-200
                            ${day ? 'cursor-pointer hover:bg-gray-600' : 'cursor-default'}
                            ${isPast(day) ? 'opacity-50' : ''}
                            ${day && isToday(day) ? 'bg-blue-500 text-white font-bold hover:bg-blue-600' : ''}
                            ${day && isSelected(day) && !isToday(day) ? 'bg-green-500 text-white font-bold hover:bg-green-600' : ''}
                            ${day && !isToday(day) && !isSelected(day) ? 'text-gray-900 hover:text-white' : ''}
                            disabled:cursor-default disabled:hover:bg-transparent
                        `}
            type='button'
            aria-label={day ? `Día ${day}` : undefined}
          >
            {day}
          </button>
        ))}
      </div>
    </div>
  );
};
