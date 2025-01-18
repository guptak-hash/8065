import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import TaskList from '../Tasks/TaskList';
import TaskForm from '../Tasks/TaskForm';
import ProductivityChart from '../Charts/ProductivityChart';
import './Dashboard.css';

const EmployeeDashboard = () => {
  const { tasks } = useContext(AppContext);

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>My Dashboard</h1>
        <TaskForm />
      </div>
      <div className="dashboard-content">
        <div className="dashboard-charts">
          <ProductivityChart data={tasks} />
        </div>
        <TaskList tasks={tasks} />
      </div>
    </div>
  );
};
