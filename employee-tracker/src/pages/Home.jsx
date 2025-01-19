



// import { useReducer, useState } from "react"

// const initialState=[];

// const todoReducer=(currentState,action)=>{
//     switch(action.type){
//         case 'ADD_TODO':
//            return [...currentState,action.payload]
//         case 'DELETE_TODO':
//             return currentState.filter(todo=>todo.id!==action.payload)
//         default:
//         currentState
//     }
// }


// const ToDo=()=>{
//   const [todos,dispatch]=useReducer(todoReducer,initialState)

//     const [inputText, setInputText]=useState("")
//     const [priority,setPriority]=useState("")

//     const handleSubmit=(e)=>{
//       e.preventDefault();
//       const newtodo={text:inputText,weight:priority,id:Date.now()}
//       dispatch({type:'ADD_TODO',payload:newtodo})
//       setInputText("")
//     }

//     const handleDelete=(id)=>{
//         dispatch({type:'DELETE_TODO',payload:id})
//     }

//     console.log(todos)
//     return (
//         <div>
//               <h1>TODO</h1>
//         <form onClick={handleSubmit}>
//             <input placeholder="type task" type="text" onChange={(e)=>setInputText(e.target.value)}
//                 value={inputText}/>
//               <select onChange={(e)=>setPriority(e.target.value)}>
//                 <option value="">Priority Level</option>
//                 <option value="p1">Critical</option>
//                 <option value="p2">High</option>
//                 <option value="p3">Medium</option>
//                 <option value="p4">Low</option>
//               </select>
//             <button type="submit">Submit</button>
//         </form>
//         <ul>
//             {
//                 todos.map((elem)=>(
//                    elem.text && elem.weight <li key={elem.id} style={{
//                     backgroundColor: elem.weight=="p1" ? "red" :elem.weight=="p2"? "orange" 
//                     :elem.weight=="p3"? "yellow": "lightblue"}}>{elem.text}
//                     <button onClick={()=>handleDelete(elem.id)}>Delete</button>
//                     </li>
//                 ))
//             }
//         </ul>
//         </div>
        
//     )
// }

// export default ToDo








import { useReducer, useState } from "react"

const initialState = [];

const todoReducer = (currentState, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [...currentState, action.payload]
        case 'DELETE_TODO':
            return currentState.filter(todo => todo.id !== action.payload)
        default:
            return currentState
    }
}

const ToDo = () => {
    const [todos, dispatch] = useReducer(todoReducer, initialState)
    const [inputText, setInputText] = useState("")
    const [priority, setPriority] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault();
        const newtodo = { text: inputText, weight: priority, id: Date.now() }
        dispatch({ type: 'ADD_TODO', payload: newtodo })
        setInputText("")
        setPriority("")
    }

    const handleDelete = (id) => {
        dispatch({ type: 'DELETE_TODO', payload: id })
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

    return (
        <div>
            <h1>TODO</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    placeholder="type task" 
                    type="text" 
                    onChange={(e) => setInputText(e.target.value)}
                    value={inputText}
                />
                <select 
                    onChange={(e) => setPriority(e.target.value)}
                    value={priority}
                >
                    <option value="">Priority Level</option>
                    <option value="p1">Critical</option>
                    <option value="p2">High</option>
                    <option value="p3">Medium</option>
                    <option value="p4">Low</option>
                </select>
                <button type="submit">Submit</button>
            </form>
            <ul>
                {todos.map((elem) => (
                    <li 
                        key={elem.id} 
                        style={{
                            backgroundColor: getBackgroundColor(elem.weight),
                            padding: '10px',
                            margin: '5px 0',
                            listStyle: 'none'
                        }}
                    >
                        {elem.text}
                        <button onClick={() => handleDelete(elem.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ToDo