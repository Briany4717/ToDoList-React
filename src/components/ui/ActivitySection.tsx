import React from 'react';

export interface ActivitySectionProps {
  activities?: string[];
  onActivityClick?: (activity: string) => void;
}


export const ActivitySection: React.FC<ActivitySectionProps> = () => {
  return (
    <div className='bg-white rounded-lg shadow-md p-4 border border-gray-200 m-10 w-2/6'>
      <h3 className='text-lg font-semibold mb-3'>Actividades Recientes</h3>
      <ul className='space-y-2'>

      </ul>
    </div>
  );
}
