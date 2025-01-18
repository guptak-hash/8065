import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './common/Navbar'
import {Route,Routes} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Users from './pages/Users'
import Register from './pages/Register'
import UserDetails from './pages/UserDetails'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar/>
    <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/about' element={<About/>}/>
    <Route path='/contact' element={<Contact/>}/>
    <Route path='/users' element={<Users/>}/>
    <Route path='/register' element={<Register/>}/>
    <Route path='/users/:id' element={<UserDetails/>}></Route>
    </Routes>
   
    </>
  )
}

export default App
