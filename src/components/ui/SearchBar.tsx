import React from 'react';
import { SearchBarProps } from '../../types';

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <div className='w-full h-12 flex items-center px-4 bg-white rounded-lg my-5 transition-all duration-400 focus-within:bg-white outline-gray-200 outline-2 focus-within:outline-blue-400'>
      <span className='material-symbols-rounded text-gray-500 mr-2'>search</span>
      <input
        type='text'
        placeholder='Buscar tarea...'
        className='w-full h-full outline-none text-lg bg-transparent placeholder:text-gray-500'
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
      />
    </div>
  );
};
