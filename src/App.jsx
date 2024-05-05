import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home.jsx'
import Login from './components/Login/Login.jsx'
import Signup from './pages/Signup/Signup.jsx' 
import { StatusContext } from './contexts/AuthContext.jsx'

function App() {

  const { status } = useContext(StatusContext)

  console.log("APP : ",status)

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
