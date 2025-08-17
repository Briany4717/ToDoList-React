// API Configuration
export const API_BASE_URL = 'http://localhost:3001/api';

// API Request configuration
export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
} as const;

// Utility functions
export const generateRandomAccent = (): string => {
  const accents = ['blue', 'green', 'orange', 'purple', 'teal', 'red'];
  return accents[Math.floor(Math.random() * accents.length)];
};
