import React, { memo } from 'react';
import { useTasks } from '../context/TaskContext';

const ThemeToggle = () => {
  const { theme, setTheme } = useTasks();

  const toggle = () => setTheme(theme === 'light' ? 'dark' : 'light');

  return (
    <button className="theme-btn" onClick={toggle} aria-label="Toggle theme">
      {theme === 'light' ? 'Dark' : 'Light'}
    </button>
  );
};

export default memo(ThemeToggle);