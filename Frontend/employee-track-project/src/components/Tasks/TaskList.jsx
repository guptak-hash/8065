

import React from 'react';
import './TaskList.css';

const TaskList = ({ tasks }) => {
  return (
    <div className="task-list">
      {tasks.map(task => (
        <div key={task.id} className="task-item">
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <div className="task-meta">
            <span className={`priority ${task.priority}`}>{task.priority}</span>
            <span className="category">{task.category}</span>
            <span className="time">{task.timeSpent}</span>
          </div>
        </div>
      ))}
    </div>
  );
};


export default TaskList