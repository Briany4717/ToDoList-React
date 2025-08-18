import React from 'react';
import { CreationModalProps } from '../../types';

export const CreationModal: React.FC<CreationModalProps> = ({
  handleCreateTask,
  closeCreate,
  firstInputRef,
  newTitle,
  setNewTitle,
  newDescription,
  setNewDescription,
}) => {
  return (
    <div className='fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
      <form
        onSubmit={handleCreateTask}
        className='bg-white w-full max-w-md rounded-2xl shadow-2xl flex flex-col gap-5 p-6 border border-gray-200 animate-fade-in'
        role='dialog'
        aria-modal='true'
        aria-labelledby='modal-title'
      >
        <div className='flex items-center justify-between'>
          <h2 id='modal-title' className='text-xl font-semibold flex items-center gap-2'>
            <span className='material-symbols-rounded text-blue-600'>note_add</span>
            Crear tarea
          </h2>
          <button
            type='button'
            onClick={closeCreate}
            className='material-symbols-rounded text-gray-500 hover:text-gray-800 transition-colors p-1 rounded-lg hover:bg-gray-100'
            aria-label='Cerrar modal'
          >
            close
          </button>
        </div>

        <div className='flex flex-col gap-3'>
          <label className='flex flex-col gap-1 text-sm font-medium'>
            Título *
            <input
              ref={firstInputRef}
              type='text'
              value={newTitle}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewTitle(e.target.value)}
              className='border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all'
              placeholder='Ej: Revisar correo'
              maxLength={70}
              required
              aria-describedby='title-hint'
            />
            <span id='title-hint' className='text-xs text-gray-500'>
              {newTitle.length}/70 caracteres
            </span>
          </label>

          <label className='flex flex-col gap-1 text-sm font-medium'>
            Descripción (opcional)
            <textarea
              value={newDescription}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setNewDescription(e.target.value)
              }
              className='border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 resize-none h-24 transition-all'
              placeholder='Detalles adicionales sobre la tarea...'
              maxLength={250}
              aria-describedby='description-hint'
            />
            <span id='description-hint' className='text-xs text-gray-500'>
              {newDescription.length}/250 caracteres
            </span>
          </label>
        </div>

        <div className='flex justify-end gap-3 pt-2'>
          <button
            type='button'
            onClick={closeCreate}
            className='px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors text-gray-700'
          >
            Cancelar
          </button>
          <button
            type='submit'
            disabled={!newTitle.trim()}
            className='px-5 py-2 rounded-lg bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 disabled:hover:bg-blue-600 text-white font-medium shadow-sm transition-all'
          >
            <span className='flex items-center gap-2'>
              <span className='material-symbols-rounded text-lg'>add</span>
              Crear tarea
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};
