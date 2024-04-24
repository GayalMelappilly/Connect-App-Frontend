import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Signup() {

  const navigate = useNavigate()

  // const handleClick = () => {
  //     window.open('http://localhost:5000/auth/google', '_self')
  // }

  const handleClick = () => {
    window.open('http://localhost:5000/auth/google', '_self')
    axios.get('http://localhost:5000/auth/success').then((data) => {
      console.log("DATA : ",data)
      navigate('/')
    })
  }

  return (
    <div className='text-center my-40'>
      <h1 className='text-6xl'>SIGNUP</h1>
      <div className='mt-10'>
        <button className='btn btn-primary' onClick={handleClick}>SIGNUP WITH GOOGLE</button>
      </div>
    </div>
  )
}

export default Signup