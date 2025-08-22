import { CircularProgress } from '../features/CircularProgress';

export interface ActivitySectionProps {
  completedTasks?: number;
  pendingTasks?: number;
}


export const ActivitySection = ({ completedTasks = 0, pendingTasks = 0 }: ActivitySectionProps) => {
  const totalTasks = completedTasks + pendingTasks;
  const progress = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);
  return (
    <div className='bg-white rounded-lg shadow-md p-4 border border-gray-300 m-10 w-3/16 h-min my-auto'>
      <h3 className='text-2xl font-semibold mb-13'>Avance Total</h3>
      <CircularProgress progress={progress} height='17rem'/>
      <h3 className='text-lg mt-7'>Estadísticas</h3>
      <ul className='mt-4 space-y-2 pl-3'>
        <li className='flex justify-between items-center'>
          <span className='text-gray-600 items-center flex gap-1'> <span className='material-symbols-rounded scale-80'>check</span> Tareas Completadas</span>
          <span className='font-semibold w-1/5 flex justify-center'>{ completedTasks }</span>
        </li>
        <li className='flex justify-between items-center'>
          <span className='text-gray-600 items-center flex gap-1'> <span className='material-symbols-rounded scale-80'>timer</span> Tareas Pendientes</span>
          <span className='font-semibold w-1/5 flex justify-center'>{ pendingTasks }</span>
        </li>
        <li className='flex justify-between items-center'>
          <span className='text-gray-600 items-center flex gap-1'>Tareas Totales</span>
          <span className='font-semibold w-1/5 flex justify-center'>{ totalTasks}</span>
        </li>
      </ul>
    </div>
  );
}
