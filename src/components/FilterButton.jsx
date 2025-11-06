import React, { memo } from 'react';
import { useTasks } from '../context/TaskContext';

const FilterButtons = () => {
  const { filter, setFilter } = useTasks();

  const filters = ['All', 'Pending', 'Completed'];

  return (
    <div className="filter-bar">
      {filters.map((f) => (
        <button
          key={f}
          className={filter === f ? 'active' : ''}
          onClick={() => setFilter(f)}
        >
          {f}
        </button>
      ))}
    </div>
  );
};

export default memo(FilterButtons);