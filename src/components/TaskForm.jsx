import React, { memo, useState } from 'react';
import { useTasks } from '../context/TaskContext';

const TaskForm = () => {
  const [text, setText] = useState('');
  const { addTask } = useTasks();

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) {
      alert('Task cannot be empty!');
      return;
    }
    addTask(trimmed);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a task..."
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default memo(TaskForm);