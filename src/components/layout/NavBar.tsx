import React from 'react';

export const NavBar: React.FC = () => {
  return (
    <nav className='fixed w-screen h-16 flex items-center px-4 bg-white shadow-sm z-50'>
      <div className='flex items-center gap-2'>
        <span className='material-symbols-rounded mr-2 text-slate-700'>partly_cloudy_night</span>
        <h1 className='text-2xl font-light text-slate-700' style={{ fontFamily: 'system-ui' }}>
          Task
          <span className='font-bold'>Manager</span>
        </h1>
      </div>
    </nav>
  );
};
