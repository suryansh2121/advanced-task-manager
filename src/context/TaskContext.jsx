import React, { createContext, useContext, useMemo, useCallback } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { v4 as uuidv4 } from 'uuid';

const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useLocalStorage('tasks', []);
  const [filter, setFilter] = useLocalStorage('filter', 'All');
  const [theme, setTheme] = useLocalStorage('theme', 'light');

  const addTask = useCallback((text) => {
    if (!text.trim()) return;
    const newTask = { id: uuidv4(), text, completed: false };
    setTasks((prev) => [...prev, newTask]);
  }, [setTasks]);

  const toggleComplete = useCallback((id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }, [setTasks]);

  const deleteTask = useCallback((id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, removing: true } : t))
    );
    setTimeout(() => {
      setTasks((prev) => prev.filter((t) => t.id !== id));
    }, 300);
  }, [setTasks]);

  const moveTask = useCallback((sourceIndex, destIndex) => {
    setTasks((prev) => {
      const newTasks = Array.from(prev);
      const [moved] = newTasks.splice(sourceIndex, 1);
      newTasks.splice(destIndex, 0, moved);
      return newTasks;
    });
  }, [setTasks]);

  const filteredTasks = useMemo(() => {
    if (filter === 'All') return tasks;
    if (filter === 'Completed') return tasks.filter((t) => t.completed);
    return tasks.filter((t) => !t.completed);
  }, [tasks, filter]);

  const value = {
    tasks,
    filteredTasks,
    filter,
    setFilter,
    theme,
    setTheme,
    addTask,
    toggleComplete,
    deleteTask,
    moveTask,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export const useTasks = () => {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error('useTasks must be used within TaskProvider');
  return ctx;
};