import { StatusBarStyle } from 'expo-status-bar';

export const THEME_COLOR: {
  [key: string]: { color: StatusBarStyle; bgColor: string };
} = {
  'bg-gray-300': { color: 'dark', bgColor: '#EDEEF4' },
  white: { color: 'dark', bgColor: '#FFF' },
  black: { color: 'light', bgColor: '#0E0E0E' },
};
