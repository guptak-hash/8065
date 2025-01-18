import React, { useState, useContext } from 'react';
import { AppContext } from '../../contexts/AppContext';
import './TaskForm.css';

const TaskForm = () => {
  const { setTasks } = useContext(AppContext);
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    timeSpent: '',
    priority: 'medium',
    category: 'BAU',
    reference: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setTasks(prev => [...prev, { ...taskData, id: Date.now(), timestamp: new Date() }]);
    setTaskData({
      title: '',
      description: '',
      timeSpent: '',
      priority: 'medium',
      category: 'BAU',
      reference: ''
    });
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      {/* Form fields */}
    </form>
  );
};

export default TaskForm