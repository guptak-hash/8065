import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';
import Layout from './components/Layout/Layout';
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard';
import EmployerDashboard from './components/Dashboard/EmployerDashboard';
import TaskDetails from './components/Tasks/TaskDetails';
import Profile from './components/Profile/Profile';
import Reports from './components/Reports/Reports';
import Analytics from './components/Analytics/Analytics';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Unauthorized from './pages/Unauthorized';
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          
          {/* Protected Routes within Layout */}
          <Route path="/" element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }>
            {/* Default redirect to dashboard */}
            <Route index element={<Navigate to="/dashboard" replace />} />
            
            {/* Employee Routes */}
            <Route path="dashboard" element={
              <ProtectedRoute>
                <EmployeeDashboard />
              </ProtectedRoute>
            } />
            <Route path="tasks/:taskId" element={
              <ProtectedRoute>
                <TaskDetails />
              </ProtectedRoute>
            } />
            <Route path="profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />

            {/* Employer Routes */}
            <Route path="employer" element={
              <ProtectedRoute requiredRole="employer">
                <EmployerDashboard />
              </ProtectedRoute>
            } />
            <Route path="reports" element={
              <ProtectedRoute requiredRole="employer">
                <Reports />
              </ProtectedRoute>
            } />
            <Route path="analytics" element={
              <ProtectedRoute requiredRole="employer">
                <Analytics />
              </ProtectedRoute>
            } />
          </Route>

          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AppProvider>
    </BrowserRouter>
  );
};

export default App;

// Update Layout.jsx to work with routing
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import './Layout.css';

const Layout = () => {
  return (
    <div className="layout">
      <Header />
      <div className="layout-content">
        <Sidebar />
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
