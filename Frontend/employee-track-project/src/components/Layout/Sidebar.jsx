import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import './Sidebar.css';

const Sidebar = () => {
  const { currentUser } = useContext(AppContext);
  const isEmployer = currentUser?.role === 'employer';

  return (
    <nav className="sidebar">
      <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'active' : ''}>
        Dashboard
      </NavLink>
      <NavLink to="/profile" className={({ isActive }) => isActive ? 'active' : ''}>
        Profile
      </NavLink>
      
      {isEmployer && (
        <>
          <NavLink to="/reports" className={({ isActive }) => isActive ? 'active' : ''}>
            Reports
          </NavLink>
          <NavLink to="/analytics" className={({ isActive }) => isActive ? 'active' : ''}>
            Analytics
          </NavLink>
        </>
      )}
    </nav>
  );
};

export default Sidebar