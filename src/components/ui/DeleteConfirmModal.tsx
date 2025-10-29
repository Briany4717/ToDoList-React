import React from 'react';

interface DeleteConfirmModalProps {
  taskTitle: string;
  onConfirm: () => void;
  onCancel: () => void;
  isDeleting?: boolean;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  taskTitle,
  onConfirm,
  onCancel,
  isDeleting = false,
}) => {
  return (
    <div className='fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
      <div
        className='bg-white w-full max-w-md rounded-2xl shadow-2xl flex flex-col gap-5 p-6 border border-gray-200 animate-fade-in'
        role='dialog'
        aria-modal='true'
        aria-labelledby='delete-modal-title'
      >
        <div className='flex items-start gap-3'>
          <div className='p-3 bg-red-100 rounded-full'>
            <span className='material-symbols-rounded text-red-600 text-2xl'>warning</span>
          </div>
          <div className='flex-1'>
            <h2 id='delete-modal-title' className='text-xl font-semibold text-gray-900 mb-2'>
              ¿Eliminar tarea?
            </h2>
            <p className='text-gray-600 text-sm'>
              Estás a punto de eliminar la tarea{' '}
              <span className='font-semibold text-gray-800'>"{taskTitle}"</span>. Esta acción no se
              puede deshacer.
            </p>
          </div>
        </div>

        <div className='flex justify-end gap-3 pt-2'>
          <button
            type='button'
            onClick={onCancel}
            disabled={isDeleting}
            className='px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed'
          >
            Cancelar
          </button>
          <button
            type='button'
            onClick={onConfirm}
            disabled={isDeleting}
            className='px-5 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2'
          >
            {isDeleting ? (
              <>
                <span className='material-symbols-rounded text-lg animate-spin'>progress_activity</span>
                Eliminando...
              </>
            ) : (
              <>
                <span className='material-symbols-rounded text-lg'>delete</span>
                Eliminar tarea
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
