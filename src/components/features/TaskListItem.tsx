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
      className={`${CompleteAnimation ? null : 'shadow-md group'} items-center w-full min-h-18 max-h-18 border border-gray-300 rounded-lg flex snap-start ${isCompleted ? '' : 'delay-800'} transition-all duration-300 cursor-pointer relative`}
      style={{ animation: (SelectedAnimation ? 'TaskListItemSelectionAnimation 500ms cubic-bezier(0.0, 0.0, 0.2, 1) forwards' : null) + (CompleteAnimation ? ',TaskItemCompleteAnimation 800ms cubic-bezier(.68,-0.55,.27,1.55) ' + (isCompleted ? '': '800ms')+' forwards':'') }}
    >
      <span
        className={`absolute material-symbols-rounded ${isSelected && !CompleteAnimation ? '-translate-x-8' : ''} ease-[cubic-bezier(.68,-0.55,.27,1.55)] transition-all duration-200`}
        style={{ fontSize: '2.0rem', color: isSelected && !CompleteAnimation ? accent : 'transparent' }}
      >
        chevron_right
      </span>

      <div className='bg-[#F8F9FA] w-full h-full flex items-center rounded-4xl justify-between pr-6'>
        <div className='flex items-center gap-4 transition-all duration-200'>
          <div
            className={`group-hover:h-10 h-9 w-1 -ml-[0.12rem] rounded-lg transition-all duration-200`}
            style={{ backgroundColor: accent }}
          />

          <div className='flex flex-col'>
            <div className='flex items-center'>
              <span
                className={`text-lg font-semibold transition-colors duration-200 ${isCompleted ? 'line-through' : ''}`}
              >
                {title}
              </span>
            </div>
            <span
              className={`text-sm text-gray-700 pl-1 transition-all duration-200 ${isCompleted ? 'line-through' : ''}`}
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
                        transition-all duration-200 overflow-hidden text-3 ${isCompleted ? (CompleteAnimation ? null : 'text-green-500') : ''}`}
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
