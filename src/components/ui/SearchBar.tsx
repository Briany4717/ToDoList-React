import React from 'react';
import { SearchBarProps } from '../types';

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <div className='w-full h-12 flex items-center px-4 bg-gray-200 rounded-lg my-5'>
      <span className='material-symbols-rounded text-gray-500 mr-2'>search</span>
      <input
        type='text'
        placeholder='Buscar tarea...'
        className='w-full h-full outline-none text-lg bg-transparent'
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
      />
    </div>
  );
};
