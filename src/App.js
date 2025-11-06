import React, { useEffect } from 'react';
import { TaskProvider, useTasks } from './context/TaskContext';
import ThemeToggle from './components/ThemeToggle';
import TaskForm from './components/TaskForm';
import FilterButtons from './components/FilterButton';
import TaskList from './components/TaskList';
import './App.css';

function AppContent() {
  const { theme } = useTasks();

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return (
    <div className="container">
      <ThemeToggle />
      <TaskForm />
      <FilterButtons />
      <TaskList />
    </div>
  );
}

export default function App() {
  return (
    <TaskProvider>
      <AppContent />
    </TaskProvider>
  );
}