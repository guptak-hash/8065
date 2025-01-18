import React from 'react';
import { Link } from 'react-router-dom';
import './Unauthorized.css';

const Unauthorized = () => {
  return (
    <div className="unauthorized">
      <h1>Unauthorized Access</h1>
      <p>You don't have permission to access this page.</p>
      <Link to="/dashboard">Return to Dashboard</Link>
    </div>
  );
};