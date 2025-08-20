import { CircularProgress } from '../features/CircularProgress';
import React from 'react';

export interface ActivitySectionProps {
  activities?: string[];
  onActivityClick?: (activity: string) => void;
}


export const ActivitySection: React.FC<ActivitySectionProps> = () => {
  return (
    <div className='bg-white rounded-lg shadow-md p-4 border border-gray-300 m-10 w-3/16 h-min my-auto'>
      <h3 className='text-2xl font-semibold mb-13'>Avance Total</h3>
      <CircularProgress progress={76} height='25lvh'/>
      <h3 className='text-lg mt-7'>Estadísticas</h3>
      <ul className='mt-4 space-y-2 pl-3'>
        <li className='flex justify-between items-center'>
          <span className='text-gray-600 items-center flex gap-1'> <span className='material-symbols-rounded scale-80'>check</span> Tareas Completadas</span>
          <span className='font-semibold w-1/5 flex justify-center'>76</span>
        </li>
        <li className='flex justify-between items-center'>
          <span className='text-gray-600 items-center flex gap-1'> <span className='material-symbols-rounded scale-80'>timer</span> Tareas Pendientes</span>
          <span className='font-semibold w-1/5 flex justify-center'>24</span>
        </li>
        <li className='flex justify-between items-center'>
          <span className='text-gray-600 items-center flex gap-1'>Tareas Totales</span>
          <span className='font-semibold w-1/5 flex justify-center'>100</span>
        </li>
      </ul>
    </div>
  );
}
