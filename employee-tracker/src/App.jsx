import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './common/Navbar'
import {Route,Routes} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Register from './pages/Register'
import NotFound from './pages/NotFound'
import Productivity from './pages/Productivity'
import AdminPanel from './pages/AdminPanel'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar/>
    <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/adminpanel' element={<AdminPanel/>}/>
    <Route path='/productivity' element={<Productivity/>}/>
    <Route path='/register' element={<Register/>}/>

    <Route path='*' element={<NotFound/>}></Route>
    </Routes>
   
    </>
  )
}

export default App
