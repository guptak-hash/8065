





import { useReducer, useState, useEffect } from "react";

const initialState = [];

const employees = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Mike Johnson" },
    { id: 4, name: "Sarah Williams" }
];

const todoReducer = (currentState, action) => {
    switch (action.type) {
        case "ADD_TODO":
            return [...currentState, action.payload];
        case "SET_TODOS":
            return action.payload;
        case "DELETE_TODO":
            return currentState.filter(todo => todo.id !== action.payload);
        case "ASSIGN_EMPLOYEE":
            return currentState.map(todo =>
                todo.id === action.payload.todoId
                    ? { ...todo, assignedTo: action.payload.employeeId }
                    : todo
            );
        case "TOGGLE_COMPLETE":
            return currentState.map(todo =>
                todo.id === action.payload
                    ? { ...todo, completed: !todo.completed, completedAt: !todo.completed ? new Date() : null }
                    : todo
            );
        default:
            return currentState;
    }
};

const ToDo = () => {
    const [todos, dispatch] = useReducer(todoReducer, initialState);
    const [inputText, setInputText] = useState("");
    const [priority, setPriority] = useState("");
    const [selectedEmployee, setSelectedEmployee] = useState("");

    const handleAssign = async (todoId, employeeId) => {
        try {
            // Find the current todo
            const todoToUpdate = todos.find(todo => todo.id === todoId);
            if (!todoToUpdate) return;
    
            // Update the assigned employee in the database
            await fetch(
                `https://hogwards-ca0ab-default-rtdb.firebaseio.com/employees/${todoId}.json`,
                {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ assignedTo: employeeId })
                }
            );
    
            // Update the local state
            dispatch({
                type: "ASSIGN_EMPLOYEE",
                payload: { todoId, employeeId }
            });
        } catch (err) {
            console.error("Error reassigning todo:", err);
        }
    };
    

    // Fetch todos from the API on component mount
    useEffect(() => {
        fetch("https://hogwards-ca0ab-default-rtdb.firebaseio.com/employees.json")
            .then(response => response.json())
            .then(data => {
                if (data) {
                    const loadedTodos = Object.keys(data).map(key => ({
                        id: key,
                        ...data[key]
                    }));
                    dispatch({ type: "SET_TODOS", payload: loadedTodos });
                }
            })
            .catch(err => console.error("Error fetching todos:", err));
    }, []);


    const handleSubmit = async e => {
        e.preventDefault();
        const newTodo = {
            text: inputText,
            weight: priority,
            assignedTo: selectedEmployee,
            completed: false,
            completedAt: null,
            createdAt: new Date(),
            status: "pending" // Add status here
        };
    
        try {
            const response = await fetch(
                "https://hogwards-ca0ab-default-rtdb.firebaseio.com/employees.json",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(newTodo)
                }
            );
            const data = await response.json();
            dispatch({ type: "ADD_TODO", payload: { id: data.name, ...newTodo } });
            setInputText("");
            setPriority("");
            setSelectedEmployee("");
        } catch (err) {
            console.error("Error adding todo:", err);
        }
    };

 

    const handleDelete = async id => {
        try {
            await fetch(
                `https://hogwards-ca0ab-default-rtdb.firebaseio.com/employees/${id}.json`,
                { method: "DELETE" }
            );
            dispatch({ type: "DELETE_TODO", payload: id });
        } catch (err) {
            console.error("Error deleting todo:", err);
        }
    };


const handleToggleComplete = async (id) => {
    const todoToUpdate = todos.find(todo => todo.id === id);
    if (!todoToUpdate) return;

    const updatedTodo = {
        ...todoToUpdate,
        completed: !todoToUpdate.completed,
        completedAt: !todoToUpdate.completed ? new Date() : null,
        status: !todoToUpdate.completed ? "completed" : "pending" // Update status here
    };

    try {
        await fetch(`https://hogwards-ca0ab-default-rtdb.firebaseio.com/employees/${id}.json`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedTodo)
        });

        dispatch({ type: "TOGGLE_COMPLETE", payload: id });
    } catch (err) {
        console.error("Error toggling task completion:", err);
    }
};




    const getBackgroundColor = weight => {
        switch (weight) {
            case "p1":
                return "red";
            case "p2":
                return "orange";
            case "p3":
                return "yellow";
            case "p4":
                return "lightblue";
            default:
                return "white";
        }
    };

    const getEmployeeName = employeeId => {
        const employee = employees.find(emp => emp.id === Number(employeeId));
        return employee ? employee.name : "Unassigned";
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Assign Task</h1>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "10px" }}>
                    <input
                        placeholder="type task"
                        type="text"
                        onChange={e => setInputText(e.target.value)}
                        value={inputText}
                        style={{ marginRight: "10px" }}
                    />
                    <select
                        onChange={e => setPriority(e.target.value)}
                        value={priority}
                        style={{ marginRight: "10px" }}
                    >
                        <option value="">Priority Level</option>
                        <option value="p1">Critical</option>
                        <option value="p2">High</option>
                        <option value="p3">Medium</option>
                        <option value="p4">Low</option>
                    </select>
                    <select
                        onChange={e => setSelectedEmployee(e.target.value)}
                        value={selectedEmployee}
                        style={{ marginRight: "10px" }}
                    >
                        <option value="">Assign To</option>
                        {employees.map(employee => (
                            <option key={employee.id} value={employee.id}>
                                {employee.name}
                            </option>
                        ))}
                    </select>
                    <button type="submit">Submit</button>
                </div>
            </form>


            <ul style={{ listStyle: "none", padding: 0 }}>
    {todos.map(elem => (
        <li
            key={elem.id}
            style={{
                backgroundColor: getBackgroundColor(elem.weight),
                padding: "10px",
                margin: "5px 0",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                opacity: elem.completed ? 0.7 : 1,
                textDecoration: elem.completed ? "line-through" : "none"
            }}
        >
            <div>
                <input
                    type="checkbox"
                    checked={elem.completed}
                    onChange={() => handleToggleComplete(elem.id)} // Toggle on checkbox change
                    style={{ marginRight: "10px" }}
                />
                <span style={{ marginRight: "10px" }}>{elem.text}</span>
                <small
                    style={{
                        backgroundColor: "#fff",
                        padding: "2px 5px",
                        borderRadius: "3px"
                    }}
                >
                    Assigned to: {getEmployeeName(elem.assignedTo)} | Status: {elem.completed ? "Completed" : "Pending"}
                </small>
            </div>
            <div>
                <select
                    onChange={e => handleAssign(elem.id, e.target.value)}
                    value={elem.assignedTo || ""}
                    style={{ marginRight: "10px" }}
                >
                    <option value="">Reassign</option>
                    {employees.map(employee => (
                        <option key={employee.id} value={employee.id}>
                            {employee.name}
                        </option>
                    ))}
                </select>
                <button onClick={() => handleDelete(elem.id)}>Delete</button>
            </div>
        </li>
    ))}
</ul>
            
</div>
    );
};

export default ToDo;
















