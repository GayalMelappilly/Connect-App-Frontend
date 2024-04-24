import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import cookieParser from 'cookie-parser'




function App() {

  console.log("HOME")

  useEffect(() => {
    // Extract user data from query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const userDataString = urlParams.get('userData');
    if (userDataString) {
        const userData = JSON.parse(userDataString);
        console.log("USER : ",userData);
    }
}, []);

  const logout = async () => {
    // try {
    //   const res = await fetch('http://localhost:5000/auth/logout', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     }
    //   })


    //   const data = await res.json()
    //   console.log("DATA : ", data)

    //   if (data.error) {
    //     console.log(data.error)
    //   }

    //   localStorage.removeItem('connect.sid')
    // } catch (error) {

    // }
  }


  return (
    <>
      <div className='text-center'>
        <h1 className='text-6xl mt-40'>HOME PAGE</h1>
        <button className="btn btn-error mt-5" onClick={logout}>LOGOUT</button>
      </div>
    </>
  )
}

export default App
