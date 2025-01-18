import { useEffect, useState } from "react"
import { useParams, useNavigate} from "react-router-dom"
import '../App.css'

const UserDetails=()=>{
  
    const [user,setUser] = useState(null)
 const {id}=useParams()
 const navigate=useNavigate();
    useEffect(()=>{
        fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then((res)=>res.json())
        .then((data)=>setUser(data))
    },[])

console.log(user)

    return user && (
        <div className="user-details">
            <button onClick={()=>navigate("/users")}>Go Back</button>
            <div className="user-header">
                <h1>{user.name}</h1>
                <p>@{user.username}</p>
            </div>

            <div className="info-section">
                <div className="info-grid">
                    <div className="info-item">
                        <h3>Email</h3>
                        <p>{user.email}</p>
                    </div>
                    <div className="info-item">
                        <h3>Phone</h3>
                        <p>{user.phone}</p>
                    </div>
                    <div className="info-item">
                        <h3>Website</h3>
                        <p>{user.website}</p>
                    </div>
                </div>
            </div>

            <div className="info-section">
                <h2>Address</h2>
                <div className="address-details">
                    <p>{user.address.street}, {user.address.suite}</p>
                    <p>{user.address.city}, {user.address.zipcode}</p>
                </div>
            </div>

            <div className="info-section">
                <h2>Company</h2>
                <div className="company-details">
                    <h3>{user.company.name}</h3>
                    <p>{user.company.catchPhrase}</p>
                    <p>{user.company.bs}</p>
                </div>
            </div>
        </div>
    )
}

export default UserDetails