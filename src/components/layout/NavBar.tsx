import React from 'react';

export const NavBar: React.FC = () => {
  return (
    <nav className='w-screen h-16 flex items-center px-4 bg-white shadow-sm z-50'>
      <div className='flex items-center gap-2 align-middle'>
        <span className='material-symbols-rounded mt-1 text-slate-700 text-4xl'>task_alt</span>
        <h1 className='text-2xl font-light text-slate-700' style={{ fontFamily: 'system-ui' }}>
          Task
          <span className='font-bold'>Manager</span>
        </h1>
      </div>
      <div className='ml-auto flex items-center gap-4'>
        <button className='material-symbols-rounded text-gray-600 hover:text-gray-800 transition-colors'>
          notifications
        </button>
        <button className='material-symbols-rounded text-gray-600 hover:text-gray-800 transition-colors'>
          settings
        </button>
        <button className='material-symbols-rounded text-gray-600 hover:text-gray-800 transition-colors'>
          account_circle
        </button>
        </div>
    </nav>
  );
};
