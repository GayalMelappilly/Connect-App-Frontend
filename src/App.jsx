import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home/Home.jsx' 
import Login from './components/Login/Login.jsx'
import Signup from './pages/Signup/Signup.jsx' 
import { StatusContext } from './contexts/AuthContext.jsx'

function App() {

  const { status, setStatus } = useContext(StatusContext)
  console.log("USERINFO : ",status)

  return (
    <div>
      <Routes>
        <Route path='/' element={ status ? <Home /> : <Signup />} />
        {/* <Route path='/' element={<Home />} /> */}
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </div>
  )
}

export default App
