export interface Tag {
  id: string;
  name: string;
  color: string;
  icon?: string; // Material Symbol icon name, o undefined para sin icono
}

export interface Task {
  id: number;
  title: string;
  description: string;
  accent: string;
  isCompleted: boolean;
  createdAt?: string;
  dueDate?: string;
  tags?: Tag[];
}

export interface CreateTaskData {
  title: string;
  description: string;
  accent: string;
  dueDate?: string;
  tags?: Tag[];
}

export interface UpdateTaskData {
  title?: string;
  description?: string;
  accent?: string;
  isCompleted?: boolean;
  dueDate?: string;
  tags?: Tag[];
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
  dueDate?: string;
  tags?: Tag[];
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
  onEdit?: (task: Task) => void;
  onDelete?: (taskId: number) => void;
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
  newDueDate: string;
  setNewDueDate: (date: string) => void;
  newTags: Tag[];
  setNewTags: (tags: Tag[]) => void;
  availableTags: Tag[];
  onCreateTag: (tag: Tag) => void;
}

export interface CalendarProps {
  onDateSelect: (date: Date | null) => void;
  selectedDate: Date | null;
  tasks: Task[];
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  success: boolean;
}
