import React from 'react';
import { TiledMenuProps } from '../../types';

export const TiledMenu: React.FC<TiledMenuProps> = ({
  children,
  tiles,
  selectedTile,
  onSelect,
  taskCounts,
}) => {
  return (
    <div className='flex flex-col w-full'>
      {/* Tab Navigation */}
      <div className='flex gap-2 mb-4 mx-auto bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl w-fit shadow-sm border border-gray-200/50'>
        {tiles.map((tile: string, index: number) => (
          <button
            key={index}
            className={`
              relative px-6 py-3 rounded-lg font-semibold text-sm
              transition-all duration-300 ease-out overflow-hidden
              ${
                selectedTile === index
                  ? 'bg-white text-blue-600 shadow-lg shadow-blue-100/50 scale-105'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-white/50 hover:scale-[1.02]'
              }
            `}
            onClick={() => onSelect(index)}
            type='button'
            aria-label={tile}
          >
            <span className={`
              absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent
              transform -translate-x-full transition-transform duration-500
              ${selectedTile !== index ? 'group-hover:translate-x-full' : ''}
            `} />

            <span className='relative z-10 flex items-center gap-2'>
              <span
                className={`material-symbols-rounded transition-all duration-300 ${
                  selectedTile === index ? 'scale-110' : ''
                }`}
                style={{
                  fontSize: '18px',
                  fontVariationSettings: selectedTile === index ? "'FILL' 1" : "'FILL' 0"
                }}
              >
                {index === 0 ? 'radio_button_unchecked' : 'check_circle'}
              </span>
              {tile}

              {/* Contador de tareas */}
              {taskCounts && taskCounts[index] !== undefined && taskCounts[index] > 0 && (
                <span className={`
                  ml-1.5 px-2 py-0.5 rounded-full text-xs font-bold animate-fadeIn
                  transition-all duration-300
                  ${selectedTile === index
                    ? 'bg-blue-100 text-blue-700 shadow-sm'
                    : 'bg-gray-200 text-gray-600'
                  }
                `}>
                  {taskCounts[index]}
                </span>
              )}
            </span>

            {/* Barra indicadora inferior */}
            {selectedTile === index && (
              <span className='absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-t-full transition-all duration-300 shadow-lg shadow-blue-500/50' />
            )}
          </button>
        ))}
      </div>

      {/* Contenido */}
      <div
        key={selectedTile}
        className='flex flex-col h-150 overflow-y-scroll px-6 pt-3 gap-3 scroll-smooth animate-fadeIn'
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: '#CBD5E1 transparent',
          WebkitOverflowScrolling: 'touch',
          overflowX: 'auto'
        }}
      >
        {children}
      </div>
    </div>
  );
};
