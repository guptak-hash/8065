import React, { useEffect, useState } from "react";

const AdminPanel = () => {
    const [todos, setTodos] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);

    // Fetch tasks from the API
    useEffect(() => {
        fetch("https://hogwards-ca0ab-default-rtdb.firebaseio.com/employees.json")
            .then(response => response.json())
            .then(data => {
                if (data) {
                    const loadedTodos = Object.keys(data).map(key => ({
                        id: key,
                        ...data[key]
                    }));
                    setTodos(loadedTodos);
                }
            })
            .catch(err => console.error("Error fetching todos:", err));
    }, []);

    // Handle delete task
    const handleDeleteTask = async (id) => {
        try {
            await fetch(`https://hogwards-ca0ab-default-rtdb.firebaseio.com/employees/${id}.json`, {
                method: "DELETE",
            });

            // Move task to completedTasks
            const taskToDelete = todos.find(todo => todo.id === id);
            setCompletedTasks([...completedTasks, taskToDelete]);

            // Update local todos
            setTodos(todos.filter(todo => todo.id !== id));
        } catch (err) {
            console.error("Error deleting task:", err);
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Admin Panel</h1>

            {/* Completed Tasks Table */}
            <h2>Completed Tasks</h2>
            <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "20px" }}>
                <thead>
                    <tr>
                        <th style={{ border: "1px solid #ccc", padding: "10px" }}>Task</th>
                        <th style={{ border: "1px solid #ccc", padding: "10px" }}>Assigned To</th>
                        <th style={{ border: "1px solid #ccc", padding: "10px" }}>Completed At</th>
                        <th style={{ border: "1px solid #ccc", padding: "10px" }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.filter(todo => todo.completed).map(task => (
                        <tr key={task.id}>
                            <td style={{ border: "1px solid #ccc", padding: "10px" }}>{task.text}</td>
                            <td style={{ border: "1px solid #ccc", padding: "10px" }}>{task.assignedTo}</td>
                            <td style={{ border: "1px solid #ccc", padding: "10px" }}>{new Date(task.completedAt).toLocaleString()}</td>
                            <td style={{ border: "1px solid #ccc", padding: "10px" }}>
                                <button
                                    style={{
                                        backgroundColor: "red",
                                        color: "white",
                                        border: "none",
                                        padding: "5px 10px",
                                        cursor: "pointer",
                                    }}
                                    onClick={() => handleDeleteTask(task.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Deleted Tasks Table */}
            <h2>Deleted Tasks</h2>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr>
                        <th style={{ border: "1px solid #ccc", padding: "10px" }}>Task</th>
                        <th style={{ border: "1px solid #ccc", padding: "10px" }}>Assigned To</th>
                        <th style={{ border: "1px solid #ccc", padding: "10px" }}>Completed At</th>
                    </tr>
                </thead>
                <tbody>
                    {completedTasks.map(task => (
                        <tr key={task.id}>
                            <td style={{ border: "1px solid #ccc", padding: "10px" }}>{task.text}</td>
                            <td style={{ border: "1px solid #ccc", padding: "10px" }}>{task.assignedTo}</td>
                            <td style={{ border: "1px solid #ccc", padding: "10px" }}>{new Date(task.completedAt).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminPanel;
