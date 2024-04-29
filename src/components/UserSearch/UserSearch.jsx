import axios from 'axios'
import React, { useEffect, useState } from 'react'

const UserSearch = () => {

    const [username, setUsername] = useState('')
    const [user, setUser] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:5000/user/list?search=${username}`).then((response) => {
            console.log("RESPONSE : ", response.data)
            setUser(response.data)
        })
    }, [username])

    return (
        <div className='absolute'>
            <input type="search" name="q" className="py-2 text-sm text-white bg-transparent rounded-md pl-10 focus:outline-none " placeholder="Search for username" autoComplete="off" value={username} onChange={(e) => { setUsername(e.target.value) }} />
            {user && <div className='absolute w-full'>
                <div className='w-full h-full bg-transparent rounded-md'>
                    {username && <div className='w-full h-full overflow-y-scroll mt-5'>
                        {user.map((user, index) => {
                            return <div className='w-full h-full flex items-center justify-between p-2 mt-2 hover:bg-gray-200 cursor-pointer' key={index}>
                                <div className='flex items-center'>
                                    <img src={user.image} alt="" className='w-10 h-10 rounded-full' />
                                    <div className='ml-2'>
                                        <h1 className='text-sm text-white'>{user.displayName}</h1>
                                        <p className='text-xs text-slate-700'>{user.email}</p>
                                    </div>
                                </div>
                                {/* <div className='flex items-center'>
                                    <button className='text-sm bg-blue-500 text-white rounded-md px-2 py-1'>Follow</button>
                                    <button className='text-sm bg-blue-500 text-white rounded-md px-2 py-1 ml-2'>Message</button>
                                    <button className='text-sm bg-blue-500 text-white rounded-md px-2 py-1 ml-2'>Block</button>
                                    <button className='text-sm bg-blue-500 text-white rounded-md px-2 py-1 ml-2'>Report</button>
                                    <button className='text-sm bg-blue-500 text-white rounded-md px-2 py-1 ml-2'>Delete</button>
                                </div> */}
                            </div>
                        })}
                    </div>}
                </div>
            </div>}
        </div>
    )
}

export default UserSearch
