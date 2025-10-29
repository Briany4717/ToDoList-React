import React from 'react';
import { Tag, Task } from '../../types';
import { TagSelector } from './TagSelector';

interface EditModalProps {
  task: Task;
  onSave: (e: React.FormEvent) => void;
  onClose: () => void;
  editTitle: string;
  setEditTitle: (title: string) => void;
  editDescription: string;
  setEditDescription: (description: string) => void;
  editDueDate: string;
  setEditDueDate: (date: string) => void;
  editTags: Tag[];
  setEditTags: (tags: Tag[]) => void;
  availableTags: Tag[];
  onCreateTag: (tag: Tag) => void;
}

export const EditModal: React.FC<EditModalProps> = ({
  task,
  onSave,
  onClose,
  editTitle,
  setEditTitle,
  editDescription,
  setEditDescription,
  editDueDate,
  setEditDueDate,
  editTags,
  setEditTags,
  availableTags,
  onCreateTag,
}) => {
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className='fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
      <form
        onSubmit={onSave}
        className='bg-white w-full max-w-md rounded-2xl shadow-2xl flex flex-col gap-5 p-6 border border-gray-200 animate-fade-in'
        role='dialog'
        aria-modal='true'
        aria-labelledby='edit-modal-title'
      >
        <div className='flex items-center justify-between'>
          <h2 id='edit-modal-title' className='text-xl font-semibold flex items-center gap-2'>
            <span className='material-symbols-rounded text-blue-600'>edit_note</span>
            Editar tarea
          </h2>
          <button
            type='button'
            onClick={onClose}
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
              type='text'
              value={editTitle}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditTitle(e.target.value)}
              className='border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all'
              placeholder='Ej: Revisar correo'
              maxLength={70}
              required
              autoFocus
              aria-describedby='edit-title-hint'
            />
            <span id='edit-title-hint' className='text-xs text-gray-500'>
              {editTitle.length}/70 caracteres
            </span>
          </label>

          <label className='flex flex-col gap-1 text-sm font-medium'>
            Descripción (opcional)
            <textarea
              value={editDescription}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setEditDescription(e.target.value)
              }
              className='border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 resize-none h-24 transition-all'
              placeholder='Detalles adicionales sobre la tarea...'
              maxLength={250}
              aria-describedby='edit-description-hint'
            />
            <span id='edit-description-hint' className='text-xs text-gray-500'>
              {editDescription.length}/250 caracteres
            </span>
          </label>

          <label className='flex flex-col gap-1 text-sm font-medium'>
            Fecha de vencimiento (opcional)
            <div className='relative'>
              <input
                type='date'
                value={editDueDate}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEditDueDate(e.target.value)
                }
                min={today}
                className='w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all'
                aria-describedby='edit-date-hint'
              />
              {editDueDate && (
                <button
                  type='button'
                  onClick={() => setEditDueDate('')}
                  className='absolute right-2 top-1/2 -translate-y-1/2 material-symbols-rounded text-gray-400 hover:text-gray-600 text-sm'
                  aria-label='Limpiar fecha'
                >
                  close
                </button>
              )}
            </div>
            <span id='edit-date-hint' className='text-xs text-gray-500'>
              {editDueDate
                ? `Vence el ${new Date(editDueDate + 'T00:00:00').toLocaleDateString('es-ES', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}`
                : 'Selecciona una fecha límite para esta tarea'}
            </span>
          </label>

          <TagSelector
            selectedTags={editTags}
            availableTags={availableTags}
            onTagsChange={setEditTags}
            onCreateTag={onCreateTag}
          />

          {/* Indicador de estado */}
          <div className='flex items-center justify-between p-3 bg-gray-50 rounded-lg'>
            <div className='flex items-center gap-2'>
              <span
                className={`material-symbols-rounded text-2xl ${
                  task.isCompleted ? 'text-green-500' : 'text-gray-400'
                }`}
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                {task.isCompleted ? 'check_circle' : 'radio_button_unchecked'}
              </span>
              <span className='text-sm text-gray-700'>
                Estado: {task.isCompleted ? 'Completada' : 'Pendiente'}
              </span>
            </div>
            <div
              className='h-4 w-4 rounded-full'
              style={{ backgroundColor: task.accent }}
              title='Color de la tarea'
            />
          </div>
        </div>

        <div className='flex justify-end gap-3 pt-2'>
          <button
            type='button'
            onClick={onClose}
            className='px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors text-gray-700'
          >
            Cancelar
          </button>
          <button
            type='submit'
            disabled={!editTitle.trim()}
            className='px-5 py-2 rounded-lg bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 disabled:hover:bg-blue-600 text-white font-medium shadow-sm transition-all'
          >
            <span className='flex items-center gap-2'>
              <span className='material-symbols-rounded text-lg'>save</span>
              Guardar cambios
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};
