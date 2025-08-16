import React from 'react';
import { FloatingButtonProps } from '../types';

export const FloatingButton: React.FC<FloatingButtonProps> = ({ 
  onClick, 
  ariaExpanded 
}) => {
  return (
    <div className='fixed bottom-8 right-8 z-40'>
      <button
        onClick={onClick}
        className='group relative flex items-center gap-2 bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-medium shadow-xl rounded-full px-5 py-3 transition-all duration-200'
        aria-haspopup='dialog'
        aria-expanded={ariaExpanded}
        type="button"
      >
        <span className='material-symbols-rounded text-2xl'>add</span>
        <span className='pr-1'>Nueva Tarea</span>
        <span className='absolute inset-0 rounded-full bg-blue-400 opacity-0 group-hover:opacity-20 transition-opacity' />
      </button>
    </div>
  );
};
