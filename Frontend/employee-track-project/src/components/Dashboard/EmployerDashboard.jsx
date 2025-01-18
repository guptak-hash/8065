
import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import TeamPerformance from '../Analytics/TeamPerformance';
import ProductivityReport from '../Analytics/ProductivityReport';
import './Dashboard.css';

const EmployerDashboard = () => {
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Team Overview</h1>
      </div>
      <div className="dashboard-content">
        <TeamPerformance />
        <ProductivityReport />
      </div>
    </div>
  );
};