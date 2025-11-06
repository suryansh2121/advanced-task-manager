import React, { createContext, useContext, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { v4 as uuidv4 } from 'uuid';

const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useLocalStorage('tasks', []);
  const [filter, setFilter] = useLocalStorage('filter', 'All');
  const [theme, setTheme] = useLocalStorage('theme', 'light');

  const addTask = (text) => {
    if (!text.trim()) return;
    const newTask = { id: uuidv4(), text, completed: false };
    setTasks((prev) => [...prev, newTask]);
  };

  const toggleComplete = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const moveTask = (dragIndex, hoverIndex) => {
    setTasks((prev) => {
      const dragged = prev[dragIndex];
      const newTasks = prev.filter((_, i) => i !== dragIndex);
      newTasks.splice(hoverIndex, 0, dragged);
      return newTasks;
    });
  };

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