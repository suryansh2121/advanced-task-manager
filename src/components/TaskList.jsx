import React, { memo } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useTasks } from '../context/TaskContext';
import TaskItem from './TaskItem';

const TaskList = () => {
  const { tasks, filteredTasks, moveTask } = useTasks();

  const onDragEnd = (result) => {
    if (!result.destination) return;
    if (result.destination.index === result.source.index) return;

    const sourceIdx = result.source.index;
    const destIdx = result.destination.index;
    const sourceTask = filteredTasks[sourceIdx];
    const sourceTaskId = sourceTask.id;
    const sourceMasterIdx = tasks.findIndex((t) => t.id === sourceTaskId);

    if (sourceMasterIdx === -1) return;

    const reorderedFiltered = Array.from(filteredTasks);
    const [movedTask] = reorderedFiltered.splice(sourceIdx, 1);
    reorderedFiltered.splice(destIdx, 0, movedTask);

    let destMasterIdx;

    if (destIdx === reorderedFiltered.length - 1) {
      const lastFilteredTaskId = reorderedFiltered[reorderedFiltered.length - 2]?.id;
      if (lastFilteredTaskId) {
        const lastFilteredTaskIdx = tasks.findIndex((t) => t.id === lastFilteredTaskId);
        destMasterIdx = lastFilteredTaskIdx !== -1 ? lastFilteredTaskIdx + 1 : tasks.length;
      } else {
        destMasterIdx = tasks.length;
      }
    } else {
      const nextTaskId = reorderedFiltered[destIdx + 1].id;
      destMasterIdx = tasks.findIndex((t) => t.id === nextTaskId);
      if (destMasterIdx === -1) destMasterIdx = tasks.length;
    }

    if (sourceMasterIdx < destMasterIdx) {
      destMasterIdx -= 1;
    }

    moveTask(sourceMasterIdx, destMasterIdx);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="tasks">
        {(provided) => (
          <ul
            className="task-list"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {filteredTasks.map((task, index) => (
              <Draggable
                key={task.id}
                draggableId={String(task.id)}
                index={index}
              >
                {(dragProvided, snapshot) => (
                  <TaskItem
                    task={task}
                    provided={dragProvided}
                    isDragging={snapshot.isDragging}
                  />
                )}
              </Draggable>
            ))}

            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default memo(TaskList);
