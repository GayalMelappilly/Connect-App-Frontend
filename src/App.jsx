import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home/Home.jsx'
import Login from './components/Login/Login.jsx'
import Signup from './components/Signup/Signup.jsx'
import { UserContext } from './contexts/AuthContext.jsx'

function App() {

  const { userInfo, setUserInfo } = useContext(UserContext)
  console.log("USERINFO : ",userInfo)

  return (
    <div>
      <Routes>
        <Route path='/' element={ userInfo ? <Home /> : <Signup />} />
        {/* <Route path='/' element={<Home />} /> */}
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </div>
  )
}

export default App
