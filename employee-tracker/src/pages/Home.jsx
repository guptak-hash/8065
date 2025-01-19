



import { useReducer, useState } from "react"

const initialState=[];

const todoReducer=(currentState,action)=>{
    switch(action.type){
        case 'ADD_TODO':
           return [...currentState,action.payload]
        case 'DELETE_TODO':
            return currentState.filter(todo=>todo.id!==action.payload)
        default:
        currentState
    }
}


const ToDo=()=>{
  const [todos,dispatch]=useReducer(todoReducer,initialState)

    const [inputText, setInputText]=useState("")
    const handleSubmit=(e)=>{
      e.preventDefault();
      const newtodo={text:inputText,id:Date.now()}
      dispatch({type:'ADD_TODO',payload:newtodo})
      setInputText("")
    }

    const handleDelete=(id)=>{
        dispatch({type:'DELETE_TODO',payload:id})
    }

    console.log(todos)
    return (
        <div>
              <h1>TODO</h1>
        <form onClick={handleSubmit}>
            <input placeholder="type todo" type="text" onChange={(e)=>setInputText(e.target.value)}
                value={inputText}/>
            <button type="submit">Submit</button>
        </form>
        <ul>
            {
                todos.map((elem)=>(
                   elem.text && <li key={elem.id}>{elem.text}
                    <button onClick={()=>handleDelete(elem.id)}>Delete</button>
                    </li>
                ))
            }
        </ul>
        </div>
        
    )
}

export default ToDo