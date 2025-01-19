import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth'; // Importing the default export
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import TaskChart from '../components/TaskChart';
import axios from 'axios';

const Dashboard = () => {
    const { authState, logout } = useAuth();
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const res = await axios.get('/api/tasks', { headers: { 'x-auth-token': localStorage.getItem('token') } });
                setTasks(res.data);
            } catch (err) {
                console.error(err.response.data);
            }
        };
        fetchTasks();
    }, []);

    const addTask = (task) => {
        setTasks([...tasks, task]);
    };

    return (
        <div>
            <h1>Welcome, {authState.user ? authState.user.name : 'User'}</h1>
            <button onClick={logout}>Logout</button>
            <TaskForm addTask={addTask} />
            <TaskList tasks={tasks} />
            <TaskChart employeeId={authState.user ? authState.user.id : null} />
        </div>
    );
};

export default Dashboard;