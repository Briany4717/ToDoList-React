export interface Task {
  id: number;
  title: string;
  description: string;
  accent: string;
  isCompleted: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateTaskData {
  title: string;
  description: string;
  accent: string;
}

export interface UpdateTaskData {
  title?: string;
  description?: string;
  accent?: string;
  isCompleted?: boolean;
}

export type TaskAction =
  | { type: 'set_all'; tasks: Task[] }
  | { type: 'toggle'; id: number; isCompleted: boolean }
  | { type: 'add'; task: Task }
  | { type: 'update'; id: number; updates: UpdateTaskData }
  | { type: 'delete'; id: number };

export interface TaskListItemProps {
  id: number;
  title: string;
  description: string;
  accent: string;
  isCompleted: boolean;
  onToggle: (id: number) => void;
  isSelected: boolean;
  onSelect: (id: number) => void;
}

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export interface TiledMenuProps {
  children: React.ReactNode;
  tiles: string[];
  selectedTile: number;
  onSelect: (index: number) => void;
}

export interface TaskDetailsCardProps {
  task?: Task | null;
}

export interface FloatingButtonProps {
  onClick: () => void;
  ariaExpanded: boolean;
}

export interface CreationModalProps {
  handleCreateTask: (e: React.FormEvent) => void;
  closeCreate: () => void;
  firstInputRef: React.RefObject<HTMLInputElement | null>;
  newTitle: string;
  setNewTitle: (title: string) => void;
  newDescription: string;
  setNewDescription: (description: string) => void;
}

export interface CalendarProps {
  onDateSelect: (date: Date) => void;
  selectedDate: Date;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  success: boolean;
}
