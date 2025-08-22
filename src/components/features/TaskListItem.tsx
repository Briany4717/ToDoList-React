import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { TaskListItemProps } from '../../types';
const LottieAnimationPath = `${import.meta.env.BASE_URL}ou4GUxLpi7.lottie`;


export const TaskListItem: React.FC<TaskListItemProps> = ({
  id,
  title,
  description,
  accent,
  isCompleted,
  dueDate,
  onToggle,
  isSelected,
  onSelect,
}) => {
  const [CompleteAnimation, setCompleteAnimation] = useState<boolean>(false);
  const [SelectedAnimation, setSelectedAnimation] = useState<boolean>(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const formatDescription = useCallback((text: string): string => {
    if (!text) return '';
    return text.length > 100 ? `${text.slice(0, 100)}...` : text;
  }, []);

  const formatDate = useCallback((date?: string): {
    text: string;
    status: 'today' | 'tomorrow' | 'overdue' | 'upcoming' | 'yesterday';
    icon: string;
  } => {
    if (!date) return { text: '', status: 'upcoming', icon: '' };

    const targetDate = new Date(date);
    const today = new Date();
    const tomorrow = new Date(today.getTime() + 86400000);
    const yesterday = new Date(today.getTime() - 86400000);

    // Normalizar fechas para comparación (sin horas)
    const normalizeDate = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
    const normalizedTarget = normalizeDate(targetDate);
    const normalizedToday = normalizeDate(today);
    const normalizedTomorrow = normalizeDate(tomorrow);
    const normalizedYesterday = normalizeDate(yesterday);

    const options: Intl.DateTimeFormatOptions = {
      month: 'short',
      day: 'numeric',
    };

    if (normalizedTarget.getTime() === normalizedToday.getTime()) {
      return { text: 'Hoy', status: 'today', icon: 'today' };
    }

    if (normalizedTarget.getTime() === normalizedTomorrow.getTime()) {
      return { text: 'Mañana', status: 'tomorrow', icon: 'event' };
    }

    if (normalizedTarget.getTime() === normalizedYesterday.getTime()) {
      return { text: 'Ayer', status: 'yesterday', icon: 'schedule' };
    }

    if (normalizedTarget < normalizedToday) {
      return {
        text: targetDate.toLocaleDateString('es-ES', options),
        status: 'overdue',
        icon: 'warning'
      };
    }

    // Próximos días
    const diffTime = normalizedTarget.getTime() - normalizedToday.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 7) {
      const dayName = targetDate.toLocaleDateString('es-ES', { weekday: 'long' });
      return {
        text: dayName.charAt(0).toUpperCase() + dayName.slice(1),
        status: 'upcoming',
        icon: 'calendar_today'
      };
    }

    return {
      text: targetDate.toLocaleDateString('es-ES', options),
      status: 'upcoming',
      icon: 'event'
    };
  }, []);

  const handleToggle = useCallback((): void => {
    if (CompleteAnimation) return;
    setCompleteAnimation(true);
    timeoutRef.current = setTimeout(() => {
      onToggle(id);
      timeoutRef.current = null;
    }, 1800);
  }, [CompleteAnimation, id, onToggle]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleSelect = useCallback((): void => {
    if (SelectedAnimation) return;
    setSelectedAnimation(true);
    onSelect(id);
    setTimeout(() => {
      setSelectedAnimation(false);
    }, 500);
  }, [SelectedAnimation, id, onSelect]);

  useEffect(() => {
      setCompleteAnimation(false);
  }, [isCompleted]);

  return (
    <div
      onClick={() => handleSelect()}
      className={`${CompleteAnimation ? null : 'shadow-md group'} bg-[#FFFFFF] items-center w-full min-h-18 max-h-18 border border-gray-300 rounded-lg flex snap-start ${isCompleted ? '' : 'delay-800'} transition-all duration-300 cursor-pointer relative`}
      style={{ animation: (SelectedAnimation ? 'TaskListItemSelectionAnimation 500ms cubic-bezier(0.0, 0.0, 0.2, 1) forwards' : null) + (CompleteAnimation ? ',TaskItemCompleteAnimation 800ms cubic-bezier(.68,-0.55,.27,1.55) ' + (isCompleted ? '': '800ms')+' forwards':'') }}
    >
      <span
        className={`absolute material-symbols-rounded ${isSelected && !CompleteAnimation ? '-translate-x-8' : ''} ease-[cubic-bezier(.68,-0.55,.27,1.55)] transition-all duration-200`}
        style={{ fontSize: '2.0rem', color: isSelected && !CompleteAnimation ? accent : 'transparent' }}
      >
        chevron_right
      </span>

      <div className=' w-full h-full flex items-center rounded-4xl justify-between pr-6'>
        <div className='flex items-center gap-4 transition-all duration-200'>
          <div
            className={`group-hover:h-10 h-9 w-1 -ml-[0.12rem] rounded-lg transition-all duration-200`}
            style={{ backgroundColor: accent }}
          />

          <div className='flex flex-col flex-1 min-w-0'>
            <div className='flex items-center w-full'>

              <span
                className={`text-lg font-semibold transition-colors duration-200 truncate ${isCompleted ? 'line-through text-gray-500' : 'text-gray-800'}`}
              >
                {title}
              </span>

        {dueDate && (() => {
                const dateInfo = formatDate(dueDate);
                if (!dateInfo.text) return null;

                const statusStyles = {
                  today: 'bg-blue-100 text-blue-800 border-blue-200',
                  tomorrow: 'bg-green-100 text-green-800 border-green-200',
                  overdue: 'bg-red-100 text-red-800 border-red-200',
                  upcoming: 'bg-gray-100 text-gray-700 border-gray-200',
                  yesterday: 'bg-orange-100 text-orange-800 border-orange-200'
                };

                return (
                  <div className={`
                    flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium not-hover:hidden
                    border transition-all duration-200 ml-2 whitespace-nowrap self-start place-self-end
                    ${statusStyles[dateInfo.status]}
                    ${isCompleted ? 'opacity-60' : ''}
                    ${dateInfo.status === 'overdue' ? 'date-badge-overdue' : ''}
                    ${dateInfo.status === 'today' ? 'date-badge-today' : ''}
                  `}>
                    <span
                      className="material-symbols-rounded text-xs"
                      style={{ fontSize: '14px' }}
                    >
                      {dateInfo.icon}
                    </span>
                    <span>{dateInfo.text}</span>
                  </div>
                );
              })()}
            </div>

            <span
              className={`text-sm pl-1 transition-all duration-200 text-nowrap ${
                isCompleted ? 'line-through text-gray-400' : 'text-gray-600'
              }`}
            >
              {formatDescription(description)}
            </span>
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            handleToggle();
          }}
          className={`material-symbols-rounded items-center justify-center cursor-pointer ${CompleteAnimation ? null :'hover:text-blue-400 hover:scale-110'}
                        transition-all duration-200 overflow-hidden text-3 ${isCompleted ? (CompleteAnimation ? null : 'text-green-500') : 'text-gray-400'}`}
          style={{ fontSize: '2.0rem', fontVariationSettings: "'FILL' 1" }}
          type='button'
          aria-label={isCompleted ? 'Marcar como pendiente' : 'Marcar como completada'}
        >

          {!isCompleted ? (
            CompleteAnimation ? (
              <DotLottieReact
                src = {LottieAnimationPath}
                loop={false}
                autoplay={CompleteAnimation}
                speed={1.5}
                style={{
                  position: 'absolute',
                  width: '5rem',
                  height: '5rem',
                  marginLeft: '-3.5rem',
                  marginTop: '-2.5rem',
                  zIndex: 2,
                }}
              />
            ) : (
              'radio_button_unchecked'
            )
          ) : CompleteAnimation ? (
            'radio_button_unchecked'
          ) : (
            'check_circle'
          )}
        </button>
      </div>
    </div>
  );
};
