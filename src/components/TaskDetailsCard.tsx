import React from 'react';
import { TaskDetailsCardProps } from '../types';

export const TaskDetailsCard: React.FC<TaskDetailsCardProps> = ({ task }) => {
  if (!task) {
    return (
      <div className='w-120 mt-12 p-4 rounded-lg border shadow-md border-gray-200'>
        <div className='flex items-center justify-center h-32 text-gray-500'>
          Selecciona una tarea para ver sus detalles.
        </div>
      </div>
    );
  }

  const { title, description, isCompleted, accent } = task;

  return (
    <div className='w-120 mt-12 p-4 rounded-lg border shadow-md border-gray-200'>
      <div className='flex items-center justify-between mb-4'>
        <div className='flex items-center gap-2'>
          <div 
            className='h-2 w-2 rounded-full' 
            style={{ backgroundColor: accent }}
          />
          <h4 className='text-gray-700 text-lg font-semibold'>
            {title || 'Detalles de la Tarea'}
          </h4>
        </div>

        <span 
          className={`material-symbols-rounded cursor-pointer transition-colors ${
            isCompleted ? 'text-green-500' : 'text-gray-400'
          }`}
          style={{ fontVariationSettings: "'FILL' 1" }}
          title={isCompleted ? 'Completada' : 'Pendiente'}
        >
          {isCompleted ? 'check_circle' : 'radio_button_unchecked'}
        </span>
      </div>
      
      <p className='text-gray-700 px-1 mb-4'>
        {description || 'Aquí puedes ver y editar los detalles de la tarea seleccionada.'}
      </p>
      
      <div className='flex mt-1 items-end gap-2 w-full justify-end'>
        <button 
          className='material-symbols-rounded text-gray-600 hover:text-gray-800 cursor-pointer transition-colors'
          title="Editar tarea"
        >
          edit
        </button>
        <button 
          className='material-symbols-rounded text-red-500 hover:text-red-700 cursor-pointer transition-colors'
          title="Eliminar tarea"
        >
          delete
        </button>
      </div>
    </div>
  );
};
