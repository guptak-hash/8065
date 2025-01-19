
import { Link, NavLink} from "react-router-dom"
import '../App.css'
const Navbar=()=>{

    return (
        <div className="navbar">
            <div className="nav-links">
                <NavLink className="nav-link" to='/'>Home</NavLink>
                <NavLink className="nav-link" to='/adminpanel'>AdminPanel</NavLink>
                <NavLink className="nav-link" to='/productivity'>Productivity</NavLink>
            
            </div>
            <NavLink to='/register'>Register</NavLink>
        </div>
    )
}

export default Navbar