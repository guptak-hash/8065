import { useEffect, useState } from "react"
import '../App.css'
import { Link } from "react-router-dom"

const Login=()=>{

    const [users,setUsers]=useState([])

  useEffect(()=>{
    fetch("https://jsonplaceholder.typicode.com/users")
    .then((res)=>res.json())
    .then((data)=>setUsers(data))
  },[])

  console.log(users)
    return (
        <div className="users-container">
            <h1>Users</h1>
            <ul>
                {users.map((elem) => (
                    <li key={elem.id}>
                        <p>{elem.name}</p>
                        <p>{elem.email}</p>
                        <Link to={`/users/${elem.id}`}>View Details</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Login