import { CircularProgress } from '../features/CircularProgress';
import React from 'react';

export interface ActivitySectionProps {
  activities?: string[];
  onActivityClick?: (activity: string) => void;
}


export const ActivitySection: React.FC<ActivitySectionProps> = () => {
  return (
    <div className='bg-white rounded-lg shadow-md p-4 border border-gray-300 m-10 w-1/4'>
      <h3 className='text-lg font-semibold mb-3'>Actividad Reciente</h3>
      <CircularProgress progress={80}/>
      <ul className='space-y-2'>

      </ul>
    </div>
  );
}
