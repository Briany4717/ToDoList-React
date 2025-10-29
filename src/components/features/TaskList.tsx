import React from 'react';
import { Task } from '../../types';
import { TaskListItem } from './TaskListItem';

interface TaskListProps {
  tasks: Task[];
  loading: boolean;
  selectedTask: number | null;
  onToggleTask: (taskId: number) => Promise<void>;
  onSelectTask: (taskId: number) => void;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  loading,
  selectedTask,
  onToggleTask,
  onSelectTask,
}) => {
  if (loading) {
    return (
      <div className='flex items-center justify-center h-32'>
        <div className='flex items-center gap-2'>
          <div className='w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin' />
          <span className='text-lg text-gray-500'>Cargando tareas...</span>
        </div>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className='flex items-center justify-center h-32'>
        <span className='text-lg text-gray-500'>No hay tareas para mostrar</span>
      </div>
    );
  }

  return (
    <>
      {tasks.map((task: Task) => (
        <TaskListItem
          key={task.id}
          id={task.id}
          title={task.title}
          description={task.description}
          accent={task.accent}
          isCompleted={task.isCompleted}
          dueDate={task.dueDate}
          tags={task.tags}
          onToggle={onToggleTask}
          isSelected={selectedTask === task.id}
          onSelect={onSelectTask}
        />
      ))}
    </>
  );
};
