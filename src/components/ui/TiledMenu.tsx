import React from 'react';
import { TiledMenuProps } from '../../types';

export const TiledMenu: React.FC<TiledMenuProps> = ({
  children,
  tiles,
  selectedTile,
  onSelect,
}) => {
  return (
    <div className='flex flex-col w-full'>
      <div className='flex gap-4'>
        {tiles.map((tile: string, index: number) => (
          <button
            key={index}
            className={`text-lg px-2 border-b cursor-pointer transition-all duration-200 ease-in-out hover:opacity-75 ${
              selectedTile === index ? 'border-black opacity-100' : 'border-transparent opacity-50'
            }`}
            onClick={() => onSelect(index)}
            type='button'
          >
            {tile}
          </button>
        ))}
      </div>
      <div className='flex flex-col h-150 overflow-y-scroll px-6 pt-3 gap-3 border-t-1 border-gray-300 scroll-smooth' style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch',overflowX: 'auto' }}>
        {children}
      </div>
    </div>
  );
};
