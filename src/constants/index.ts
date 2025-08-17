// Application constants
export const API_BASE_URL = 'http://localhost:3001' as const;

export const ROUTES = {
  TASKS: '/tasks',
} as const;

export const UI_CONSTANTS = {
  ANIMATION_DURATION: 300,
  DEBOUNCE_DELAY: 300,
  MODAL_Z_INDEX: 1000,
} as const;

export const TASK_STATUS = {
  PENDING: false,
  COMPLETED: true,
} as const;

export const DATE_FORMAT = {
  DISPLAY: 'DD/MM/YYYY',
  API: 'YYYY-MM-DD',
} as const;
