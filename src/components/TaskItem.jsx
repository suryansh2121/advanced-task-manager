import React, { memo } from 'react';
import { useTasks } from '../context/TaskContext';

const TaskItem = ({ task, provided, isDragging }) => {
  const { toggleComplete, deleteTask } = useTasks();

  return (
    <li
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className={`task-item ${task.completed ? 'completed' : ''} ${
        isDragging ? 'dragging' : ''
      }`}
      style={{
        ...provided.draggableProps.style,
        background: isDragging ? 'var(--primary)' : 'var(--card-bg)',
        opacity: isDragging ? 0.8 : 1,
      }}
    >
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleComplete(task.id)}
      />
      <span className="task-text">{task.text}</span>
      <button className="delete-btn" onClick={() => deleteTask(task.id)}>
        ×
      </button>
    </li>
  );
};

export default memo(TaskItem);