export const API_BASE_URL = 'http://localhost:3001/api';

export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
} as const;

export const generateRandomAccent = (): string => {
  const accents = ['blue', 'green', 'orange', 'purple', 'teal', 'red'];
  return accents[Math.floor(Math.random() * accents.length)];
};
