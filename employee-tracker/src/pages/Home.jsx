




// import { useReducer, useState, useEffect} from "react"

// const initialState = [];

// const employees = [
//     { id: 1, name: "John Doe" },
//     { id: 2, name: "Jane Smith" },
//     { id: 3, name: "Mike Johnson" },
//     { id: 4, name: "Sarah Williams" }
// ];

// const todoReducer = (currentState, action) => {
//     switch (action.type) {
//         case 'ADD_TODO':
//             return [...currentState, action.payload]
//         case 'DELETE_TODO':
//             return currentState.filter(todo => todo.id !== action.payload)
//         case 'ASSIGN_EMPLOYEE':
//             return currentState.map(todo => 
//                 todo.id === action.payload.todoId 
//                     ? { ...todo, assignedTo: action.payload.employeeId }
//                     : todo
//             )
//         case 'TOGGLE_COMPLETE':
//             return currentState.map(todo =>
//                 todo.id === action.payload
//                     ? { ...todo, completed: !todo.completed, completedAt: !todo.completed ? new Date() : null }
//                     : todo
//             )
//         default:
//             return currentState
//     }
// }

// const ToDo = () => {
//     const [todos, dispatch] = useReducer(todoReducer, initialState)
//     const [inputText, setInputText] = useState("")
//     const [priority, setPriority] = useState("")
//     const [selectedEmployee, setSelectedEmployee] = useState("")

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const newtodo = { 
//             text: inputText, 
//             weight: priority, 
//             id: Date.now(),
//             assignedTo: selectedEmployee,
//             completed: false,
//             completedAt: null,
//             createdAt: new Date()
//         }
//         dispatch({ type: 'ADD_TODO', payload: newtodo })
//         setInputText("")
//         setPriority("")
//         setSelectedEmployee("")
//     }

//     const handleDelete = (id) => {
//         dispatch({ type: 'DELETE_TODO', payload: id })
//     }

//     const handleAssign = (todoId, employeeId) => {
//         dispatch({ 
//             type: 'ASSIGN_EMPLOYEE', 
//             payload: { todoId, employeeId }
//         })
//     }

//     const handleToggleComplete = (id) => {
//         dispatch({ type: 'TOGGLE_COMPLETE', payload: id })
//     }

//     const getBackgroundColor = (weight) => {
//         switch (weight) {
//             case "p1": return "red"
//             case "p2": return "orange"
//             case "p3": return "yellow"
//             case "p4": return "lightblue"
//             default: return "white"
//         }
//     }

//     const getEmployeeName = (employeeId) => {
//         const employee = employees.find(emp => emp.id === Number(employeeId))
//         return employee ? employee.name : "Unassigned"
//     }

//     // Store todos in localStorage whenever it changes
// useEffect(() => {
//         localStorage.setItem('todos', JSON.stringify(todos));
//     }, [todos]);

//     return (
//         <div style={{ padding: '20px' }}>
//             <h1>TODO</h1>
//             <form onSubmit={handleSubmit}>
//                 <div style={{ marginBottom: '10px' }}>
//                     <input 
//                         placeholder="type task" 
//                         type="text" 
//                         onChange={(e) => setInputText(e.target.value)}
//                         value={inputText}
//                         style={{ marginRight: '10px' }}
//                     />
//                     <select 
//                         onChange={(e) => setPriority(e.target.value)}
//                         value={priority}
//                         style={{ marginRight: '10px' }}
//                     >
//                         <option value="">Priority Level</option>
//                         <option value="p1">Critical</option>
//                         <option value="p2">High</option>
//                         <option value="p3">Medium</option>
//                         <option value="p4">Low</option>
//                     </select>
//                     <select
//                         onChange={(e) => setSelectedEmployee(e.target.value)}
//                         value={selectedEmployee}
//                         style={{ marginRight: '10px' }}
//                     >
//                         <option value="">Assign To</option>
//                         {employees.map(employee => (
//                             <option key={employee.id} value={employee.id}>
//                                 {employee.name}
//                             </option>
//                         ))}
//                     </select>
//                     <button type="submit">Submit</button>
//                 </div>
//             </form>
//             <ul style={{ listStyle: 'none', padding: 0 }}>
//                 {todos.map((elem) => (
//                     <li 
//                         key={elem.id} 
//                         style={{
//                             backgroundColor: getBackgroundColor(elem.weight),
//                             padding: '10px',
//                             margin: '5px 0',
//                             display: 'flex',
//                             justifyContent: 'space-between',
//                             alignItems: 'center',
//                             opacity: elem.completed ? 0.7 : 1,
//                             textDecoration: elem.completed ? 'line-through' : 'none'
//                         }}
//                     >
//                         <div>
//                             <input
//                                 type="checkbox"
//                                 checked={elem.completed}
//                                 onChange={() => handleToggleComplete(elem.id)}
//                                 style={{ marginRight: '10px' }}
//                             />
//                             <span style={{ marginRight: '10px' }}>{elem.text}</span>
//                             <small style={{ 
//                                 backgroundColor: '#fff', 
//                                 padding: '2px 5px', 
//                                 borderRadius: '3px' 
//                             }}>
//                                 Assigned to: {getEmployeeName(elem.assignedTo)}
//                             </small>
//                         </div>
//                         <div>
//                             <select
//                                 onChange={(e) => handleAssign(elem.id, e.target.value)}
//                                 value={elem.assignedTo || ""}
//                                 style={{ marginRight: '10px' }}
//                             >
//                                 <option value="">Reassign</option>
//                                 {employees.map(employee => (
//                                     <option key={employee.id} value={employee.id}>
//                                         {employee.name}
//                                     </option>
//                                 ))}
//                             </select>
//                             <button onClick={() => handleDelete(elem.id)}>Delete</button>
//                         </div>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     )
// }

// export default ToDo













import { useReducer, useState, useEffect} from "react"

const initialState = [];

const employees = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Mike Johnson" },
    { id: 4, name: "Sarah Williams" }
];

const todoReducer = (currentState, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [...currentState, action.payload]
        case 'DELETE_TODO':
            return currentState.filter(todo => todo.id !== action.payload)
        case 'ASSIGN_EMPLOYEE':
            return currentState.map(todo => 
                todo.id === action.payload.todoId 
                    ? { ...todo, assignedTo: action.payload.employeeId }
                    : todo
            )
        case 'TOGGLE_COMPLETE':
            return currentState.map(todo =>
                todo.id === action.payload
                    ? { ...todo, completed: !todo.completed, completedAt: !todo.completed ? new Date() : null }
                    : todo
            )
        default:
            return currentState
    }
}

const ToDo = () => {
    const [todos, dispatch] = useReducer(todoReducer, initialState)
    const [inputText, setInputText] = useState("")
    const [priority, setPriority] = useState("")
    const [selectedEmployee, setSelectedEmployee] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault();
        const newtodo = { 
            text: inputText, 
            weight: priority, 
            id: Date.now(),
            assignedTo: selectedEmployee,
            completed: false,
            completedAt: null,
            createdAt: new Date()
        }
        dispatch({ type: 'ADD_TODO', payload: newtodo })
        setInputText("")
        setPriority("")
        setSelectedEmployee("")
    }

    const handleDelete = (id) => {
        dispatch({ type: 'DELETE_TODO', payload: id })
    }

    const handleAssign = (todoId, employeeId) => {
        dispatch({ 
            type: 'ASSIGN_EMPLOYEE', 
            payload: { todoId, employeeId }
        })
    }

    const handleToggleComplete = (id) => {
        dispatch({ type: 'TOGGLE_COMPLETE', payload: id })
    }

    const getBackgroundColor = (weight) => {
        switch (weight) {
            case "p1": return "red"
            case "p2": return "orange"
            case "p3": return "yellow"
            case "p4": return "lightblue"
            default: return "white"
        }
    }

    const getEmployeeName = (employeeId) => {
        const employee = employees.find(emp => emp.id === Number(employeeId))
        return employee ? employee.name : "Unassigned"
    }

    // Store todos in localStorage whenever it changes
useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    return (
        <div style={{ padding: '20px' }}>
            <h1>TODO</h1>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '10px' }}>
                    <input 
                        placeholder="type task" 
                        type="text" 
                        onChange={(e) => setInputText(e.target.value)}
                        value={inputText}
                        style={{ marginRight: '10px' }}
                    />
                    <select 
                        onChange={(e) => setPriority(e.target.value)}
                        value={priority}
                        style={{ marginRight: '10px' }}
                    >
                        <option value="">Priority Level</option>
                        <option value="p1">Critical</option>
                        <option value="p2">High</option>
                        <option value="p3">Medium</option>
                        <option value="p4">Low</option>
                    </select>
                    <select
                        onChange={(e) => setSelectedEmployee(e.target.value)}
                        value={selectedEmployee}
                        style={{ marginRight: '10px' }}
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
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {todos.map((elem) => (
                    <li 
                       
                        key={elem.id} 
                        style={{
                            backgroundColor: getBackgroundColor(elem.weight),
                            padding: '10px',
                            margin: '5px 0',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            opacity: elem.completed ? 0.7 : 1,
                            textDecoration: elem.completed ? 'line-through' : 'none'
                        }}
                    >
                        <div>
                            <input
                                type="checkbox"
                                checked={elem.completed}
                                onChange={() => handleToggleComplete(elem.id)}
                                style={{ marginRight: '10px' }}
                            />
                            <span style={{ marginRight: '10px' }}>{elem.text}</span>
                            <small style={{ 
                                backgroundColor: '#fff', 
                                padding: '2px 5px', 
                                borderRadius: '3px' 
                            }}>
                                Assigned to: {getEmployeeName(elem.assignedTo)}
                            </small>
                        </div>
                        <div>
                            <select
                                onChange={(e) => handleAssign(elem.id, e.target.value)}
                                value={elem.assignedTo || ""}
                                style={{ marginRight: '10px' }}
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
    )
}

export default ToDo