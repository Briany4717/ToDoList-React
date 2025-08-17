import React from 'react';

interface ErrorMessageProps {
  message: string;
  onDismiss?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onDismiss }) => {
  return (
    <div className='w-full p-3 mb-4 bg-red-100 border border-red-400 text-red-700 rounded-md flex items-center justify-between'>
      <div className='flex items-center gap-2'>
        <span className='material-symbols-rounded text-red-500'>error</span>
        <span>Error: {message}</span>
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className='material-symbols-rounded text-red-500 hover:text-red-700 cursor-pointer transition-colors'
          title='Cerrar'
        >
          close
        </button>
      )}
    </div>
  );
};
