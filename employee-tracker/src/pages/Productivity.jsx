






import React, { useEffect, useState } from "react";

const Productivity = () => {
    const [todos, setTodos] = useState([]);
    const employees = [
        { id: 1, name: "John Doe" },
        { id: 2, name: "Jane Smith" },
        { id: 3, name: "Mike Johnson" },
        { id: 4, name: "Sarah Williams" }
    ];

    // Fetch todos from the API
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

    // Calculate productivity
    const getProductivityData = () => {
        return employees.map(employee => {
            const assignedTasks = todos.filter(todo => todo.assignedTo === employee.id.toString());
            const completedTasks = assignedTasks.filter(todo => todo.completed);
            return {
                name: employee.name,
                assigned: assignedTasks.length,
                completed: completedTasks.length
            };
        });
    };

    const productivityData = getProductivityData();

    return (
        <div style={{ padding: "20px" }}>
            <h1>Employee Productivity</h1>
            <table
                style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    textAlign: "left",
                    marginTop: "20px"
                }}
            >
                <thead>
                    <tr>
                        <th style={{ border: "1px solid #ccc", padding: "10px" }}>Employee</th>
                        <th style={{ border: "1px solid #ccc", padding: "10px" }}>Tasks Assigned</th>
                        <th style={{ border: "1px solid #ccc", padding: "10px" }}>Tasks Completed</th>
                    </tr>
                </thead>
                <tbody>
                    {productivityData.map((employee, index) => (
                        <tr key={index}>
                            <td style={{ border: "1px solid #ccc", padding: "10px" }}>{employee.name}</td>
                            <td style={{ border: "1px solid #ccc", padding: "10px" }}>{employee.assigned}</td>
                            <td style={{ border: "1px solid #ccc", padding: "10px" }}>{employee.completed}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Productivity;