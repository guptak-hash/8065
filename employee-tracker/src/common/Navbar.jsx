
import { Link, NavLink} from "react-router-dom"
import '../App.css'
const Navbar=()=>{

    return (
        <div className="navbar">
            <div className="nav-links">
                <NavLink className="nav-link" to='/'>Home</NavLink>
                <NavLink className="nav-link" to='/about'>About</NavLink>
                <NavLink className="nav-link" to='/users'>Users</NavLink>
                <NavLink className="nav-link" to='/contact'>Contact</NavLink>
            
            </div>
            <NavLink to='/register'>Register</NavLink>
        </div>
    )
}

export default Navbar