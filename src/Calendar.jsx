import { useState } from "react";


export const Calendar = ({ onDateSelect, selectedDate }) => {
    const [currentDate, setCurrentDate] = useState(new Date());

    // Obtener información del mes actual
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const today = new Date();

    // Nombres de los meses
    const monthNames = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];

    // Obtener el primer día del mes y cuántos días tiene
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();
    const startingDayOfWeek = firstDayOfMonth.getDay(); // 0 = Domingo, 1 = Lunes, etc.

    // Ajustar para que Lunes sea el primer día (0)
    const adjustedStartingDay = startingDayOfWeek === 0 ? 6 : startingDayOfWeek - 1;

    // Función para navegar entre meses
    const goToPreviousMonth = () => {
        setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
    };

    const goToNextMonth = () => {
        setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
    };

    // Generar array de días del mes
    const generateCalendarDays = () => {
        const days = [];

        // Días vacíos al inicio
        for (let i = 0; i < adjustedStartingDay; i++) {
            days.push(null);
        }

        // Días del mes
        for (let day = 1; day <= daysInMonth; day++) {
            days.push(day);
        }

        return days;
    };

    const calendarDays = generateCalendarDays();

    const isPast = (day) => {
        return (today.getDate() > day && today.getMonth() === currentMonth && today.getFullYear() === currentYear) || (today.getMonth() > currentMonth && today.getFullYear() === currentYear) || (today.getFullYear() > currentYear);
    };
    // Verificar si es el día actual
    const isToday = (day) => {
        return today.getDate() === day &&
            today.getMonth() === currentMonth &&
            today.getFullYear() === currentYear;
    };

    // Verificar si es el día seleccionado
    const isSelected = (day) => {
        if (!selectedDate || !day) return false;
        return selectedDate.getDate() === day &&
            selectedDate.getMonth() === currentMonth &&
            selectedDate.getFullYear() === currentYear;
    };

    // Manejar selección de día
    const handleDayClick = (day) => {
        if (day && onDateSelect) {
            const newSelectedDate = new Date(currentYear, currentMonth, day);
            onDateSelect(newSelectedDate);
        }
    };

    return (
        <div className='flex flex-col h-min items-center p-6 rounded-4xl m-4 min-w-80'>
            {/* Header del calendario */}
            <div className='flex items-center justify-between w-full mb-4'>
                <span
                    onClick={goToPreviousMonth}
                    className='material-symbols-rounded cursor-pointer hover:text-blue-400 transition-colors duration-200 text-2xl'
                >
                    chevron_left
                </span>
                <span className='cursor-default text-xl font-semibold'>
                    {monthNames[currentMonth]} {currentYear}
                </span>
                <span
                    onClick={goToNextMonth}
                    className='material-symbols-rounded cursor-pointer hover:text-blue-400 transition-colors duration-200 text-2xl'
                >
                    chevron_right
                </span>
            </div>

            {/* Días de la semana */}
            <div className='grid grid-cols-7 gap-2 mb-2 w-full'>
                {['LUN', 'MAR', 'MIE', 'JUE', 'VIE', 'SAB', 'DOM'].map(day => (
                    <div key={day} className='text-center text-sm text-gray-900 font-medium p-2'>
                        {day}
                    </div>
                ))}
            </div>

            {/* Días del mes */}
            <div className='grid grid-cols-7 gap-2 w-full'>
                {calendarDays.map((day, index) => (
                    <div
                        key={index}
                        onClick={() => handleDayClick(day)}
                        className={`
              h-10 w-10 flex items-center justify-center text-sm rounded-lg transition-all duration-200
              ${day ? 'cursor-pointer hover:bg-gray-600' : ''}
              ${isPast(day) ? 'opacity-50' : ''}
              ${day && isToday(day) ? 'bg-blue-500 text-white font-bold hover:bg-blue-600' : ''}
              ${day && isSelected(day) && !isToday(day) ? 'bg-green-500 text-white font-bold hover:bg-green-600' : ''}
              ${day && !isToday(day) && !isSelected(day) ? 'text-gray-900 hover:text-white' : ''}
            `}
                    >
                        {day}
                    </div>
                ))}
            </div>
        </div>
    );
}