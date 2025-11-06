import React from 'react';
import { useTasks } from '../context/TaskContext';

export default function ThemeToggle() {
  const { theme, setTheme } = useTasks();

  const toggle = () => setTheme(theme === 'light' ? 'dark' : 'light');

  return (
    <button className="theme-btn" onClick={toggle} aria-label="Toggle theme">
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
}