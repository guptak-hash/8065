import React, { useState } from 'react';
import axios from 'axios';

const TaskForm = ({ addTask }) => {
    const [task, setTask] = useState({ title: '', description: '', timeSpent: '', priority: '', reference: '', category: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/tasks', task, { headers: { 'x-auth-token': localStorage.getItem('token') } });
            addTask(res.data);
            setTask({ title: '', description: '', timeSpent: '', priority: '', reference: '', category: '' });
        } catch (err) {
            console.error(err.response.data);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="title" value={task.title} onChange={handleChange} placeholder="Title" required />
            <textarea name="description" value={task.description} onChange={handleChange} placeholder="Description" required />
            <input type="number" name="timeSpent" value={task.timeSpent} onChange={handleChange} placeholder="Time Spent" required />
            <select name="priority" value={task.priority} onChange={handleChange} required>
                <option value="">Select Priority</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>
            <input type="text" name="reference" value={task.reference} onChange={handleChange} placeholder="Reference" />
            <select name="category" value={task.category} onChange={handleChange} required>
                <option value="">Select Category</option>
                <option value="BAU">BAU</option>
                <option value="Ad Hoc">Ad Hoc</option>
                <option value="Project-Based">Project-Based</option>
            </select>
            <button type="submit">Log Task</button>
        </form>
    );
};

export default TaskForm;