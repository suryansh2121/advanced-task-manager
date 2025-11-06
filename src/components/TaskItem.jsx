import React, { memo } from 'react';
import { useTasks } from '../context/TaskContext';

const TaskItem = ({ task, provided, isDragging }) => {
  const { toggleComplete, deleteTask } = useTasks();

  const className = [
    'task-item',
    task.completed && 'completed',
    task.removing && 'removing',
    isDragging && 'dragging',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <li
      ref={provided.innerRef}
      {...provided.draggableProps}
      className={className}
      style={{
        ...provided.draggableProps.style,
        opacity: isDragging ? 0.8 : 1,
      }}
    >
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleComplete(task.id)}
      />
      <span
        className="task-text"
        {...provided.dragHandleProps}
        style={{ cursor: 'grab' }}
      >
        {task.text}
      </span>
      <button
        className="delete-btn"
        onClick={() => deleteTask(task.id)}
      >
        Delete
      </button>
    </li>
  );
};

export default memo(TaskItem);