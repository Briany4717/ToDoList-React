import React from 'react';
import { TaskDetailsCardProps } from '../../types';

export const TaskDetailsCard: React.FC<TaskDetailsCardProps> = ({ task, onEdit, onDelete }) => {
  const handleEdit = () => {
    if (task && onEdit) {
      onEdit(task);
    }
  };

  const handleDelete = () => {
    if (task && onDelete) {
      onDelete(task.id);
    }
  };

  return (
    <div
      className="
        w-120 mt-12 p-4 rounded-lg border shadow-md bg-white border-gray-300
        transition-all duration-300 ease-in-out transform hover:shadow-lg hover:scale-[1.02]
        content-transition
      "
      style={{
        minHeight: '140px', // Altura mínima para evitar colapsos bruscos
      }}
    >
      <div className="transition-all duration-300 ease-in-out">
        {!task ? (
          <div
            key="empty-state"
            className="flex items-center justify-center h-32 text-gray-500 animate-fade-in"
          >
            <div className="text-center">
              <div className="material-symbols-rounded text-4xl mb-2 text-gray-300">
                task_alt
              </div>
              <p>Selecciona una tarea para ver sus detalles.</p>
            </div>
          </div>
        ) : (
          <div key={`task-${task.id}`} className="animate-fade-in">
            <div className='flex items-center justify-between mb-4'>
              <div className='flex items-center gap-2'>
                <div
                  className='h-3 w-3 rounded-full transition-all duration-300 ease-in-out transform hover:scale-125'
                  style={{ backgroundColor: task.accent }}
                />
                <h4 className='text-gray-700 text-2xl font-semibold transition-all duration-300 ease-in-out'>
                  {task.title || 'Detalles de la Tarea'}
                </h4>
              </div>

              <span
                className={`material-symbols-rounded cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-110 ${
                  task.isCompleted ? 'text-green-500' : 'text-gray-400'
                }`}
                style={{ fontVariationSettings: "'FILL' 1" }}
                title={task.isCompleted ? 'Completada' : 'Pendiente'}
              >
                {task.isCompleted ? 'check_circle' : 'radio_button_unchecked'}
              </span>
            </div>

            <p className='text-gray-700 px-1 mb-4 transition-all duration-300 ease-in-out'>
              {task.description || 'Aquí puedes ver y editar los detalles de la tarea seleccionada.'}
            </p>

            {/* Tags de la tarea */}
            {task.tags && task.tags.length > 0 && (
              <div className='mb-4 px-1'>
                <div className='flex items-center gap-2 mb-2'>
                  <span className='material-symbols-rounded text-gray-600' style={{ fontSize: '18px' }}>
                    label
                  </span>
                  <span className='text-sm font-medium text-gray-600'>Tags:</span>
                </div>
                <div className='flex flex-wrap gap-2'>
                  {task.tags.map((tag) => (
                    <span
                      key={tag.id}
                      className='flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105'
                      style={{
                        backgroundColor: tag.color,
                        color: '#FFFFFF',
                      }}
                    >
                      {tag.icon && (
                        <span
                          className='material-symbols-rounded'
                          style={{ fontSize: '16px', fontVariationSettings: "'FILL' 1" }}
                        >
                          {tag.icon}
                        </span>
                      )}
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className='flex mt-1 items-end gap-2 w-full justify-end'>
              <button
                onClick={handleEdit}
                className='material-symbols-rounded text-gray-600 hover:text-gray-800 cursor-pointer transition-all duration-200 ease-in-out transform hover:scale-110 hover:bg-gray-100 p-2 rounded-full'
                title='Editar tarea'
                type='button'
              >
                edit
              </button>
              <button
                onClick={handleDelete}
                className='material-symbols-rounded text-red-500 hover:text-red-700 cursor-pointer transition-all duration-200 ease-in-out transform hover:scale-110 hover:bg-red-50 p-2 rounded-full'
                title='Eliminar tarea'
                type='button'
              >
                delete
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
