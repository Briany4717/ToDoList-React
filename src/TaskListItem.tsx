import React, { useState, useEffect, useCallback, useRef } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { TaskListItemProps } from './types';

export const TaskListItem: React.FC<TaskListItemProps> = ({ 
    id, 
    title, 
    description, 
    accent, 
    isCompleted, 
    onToggle, 
    isSelected, 
    onSelect 
}) => {
    const [animation, setAnimation] = useState<boolean>(true);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const formatDescription = useCallback((text: string): string => {
        if (!text) return '';
        return text.length > 100 ? `${text.slice(0, 100)}...` : text;
    }, []);

    const handleToggle = useCallback((): void => {
        // Evita múltiples disparos durante la animación
        if (!animation) return;
        setAnimation(false);
        timeoutRef.current = setTimeout(() => {
            onToggle(id);
            setAnimation(true);
            timeoutRef.current = null;
        }, (isCompleted ? 1200 : 1200));
    }, [animation, id, onToggle, isCompleted]);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);
    return (
        <div onClick={() => onSelect(id)}
            className={`${animation ? 'shadow-md group' : '-mt-21 -z-10'} items-center w-full min-h-18 max-h-18 border border-gray-300 rounded-lg flex snap-start ${isCompleted ? '' : 'delay-800'} transition-all duration-300 cursor-pointer relative`}>
            <span className={`absolute material-symbols-rounded -z-1 ${isSelected && animation ? '-translate-x-8' : ''} ease-[cubic-bezier(.68,-0.55,.27,1.55)] transition-all duration-200`}
                style={{ fontSize: '2.0rem', color: isSelected ? accent : 'transparent' }}>chevron_right</span>
            <div className='bg-[#F8F9FA] w-full h-full flex items-center rounded-4xl justify-between pr-6'>
                <div className='flex items-center gap-4 transition-all duration-200'>
                    <div className={`group-hover:h-10 h-9 w-1 -ml-[0.12rem] rounded-lg transition-all duration-200`}
                        style={{ backgroundColor: accent }}></div>
                    <div className='flex flex-col'>
                        <div className='flex'>
                            <span className='material-symbols-rounded'>star</span>
                            <span className={`text-lg font-semibold transition-colors duration-200 ${isCompleted ? 'line-through' : ''}`}>{title}</span>
                        </div>
                        <span className={`text-sm text-gray-700 pl-1 transition-all duration-200 ${isCompleted ? 'line-through' : ''}`}>{formatDescription(description)}</span>
                    </div>
                </div>
                <span
                    onClick={handleToggle}
                    className={`material-symbols-rounded items-center justify-center cursor-pointer ${animation ? 'hover:text-blue-400 hover:scale-110' : ''} 
            transition-all duration-200 overflow-hidden text-3 ${isCompleted ? (animation ? 'text-green-500' : '') : ''}`}
                    style={{ fontSize: '2.0rem', fontVariationSettings: "'FILL' 1" }}
                >

                    {!isCompleted ? (animation ? 'radio_button_unchecked' : <DotLottieReact
                        src="src/assets/ou4GUxLpi7.lottie"
                        loop={false}
                        autoplay={!animation}
                        speed={1.5}
                        style={{ position: 'absolute', width: '5rem', height: '5rem', marginLeft: '-3.5rem', marginTop: '-2.5rem', zIndex: 2 }}
                    />) : (animation ? 'check_circle' : 'radio_button_unchecked')}

                </span>

            </div>
        </div>
    );
}