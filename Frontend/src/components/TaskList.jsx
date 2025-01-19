import React from 'react';

const TaskList = ({ tasks }) => {
    return (
        <div>
            <h2>My Tasks</h2>
            <ul>
                {tasks.map(task => (
                    <li key={task._id}>
                        <strong>{task.title}</strong> - {task.priority} - {task.timeSpent} hours
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;