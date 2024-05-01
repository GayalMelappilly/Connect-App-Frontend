import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { CiSearch } from 'react-icons/ci'
import { UserInfoContext } from '../../contexts/UserInfoContext'

const UserSearch = () => {

    const [username, setUsername] = useState('')
    const [user, setUser] = useState([])

    const { userInfo } = useContext(UserInfoContext)

    useEffect(() => {
        axios.get(`http://localhost:5000/user/list?search=${username}`).then((response) => {
            // console.log("RESPONSE : ", response.data)
            setUser(response.data)
        })
    }, [username])

    const handleAddFriend = (userid) => {
        axios.post(`http://localhost:5000/user/add-friend`,{senderId: userInfo._id, receiverId: userid}).then((response)=>{
            console.log(response.data)
        })
        console.log(userid,' / ',userInfo._id)
    }

    return (
        <div className='absolute w-11/12'>
            <div className="relative text-gray-600 focus-within:text-gray-400 ">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                    <button type="submit" className="p-1 focus:outline-none focus:shadow-outline">
                        <CiSearch size={20} />
                    </button>
                </span>
                <input type="search" name="q" className="py-2 text-sm text-white bg-transparent rounded-md pl-10 focus:outline-none placeholder-marquee" placeholder="Search for user" autoComplete="off" value={username} onChange={(e) => { setUsername(e.target.value) }} />
            </div>
            <hr />
            {user && <div className='absolute w-full'>
                <div className='w-full h-full bg-transparent rounded-md'>
                    {username && <div className='w-full h-full overflow-y-scroll mt-5'>
                        {user.map((user, index) => {
                            return <div className='w-full h-full flex items-center justify-between p-2 mt-2cursor-pointer' key={index}>
                                <div className='flex items-center'>
                                    <img src={user.image} alt="" className='w-10 h-10 rounded-full' />
                                    <div className='ml-2'>
                                        <h1 className='text-sm text-white'>{user.displayName}</h1>
                                        <p className='text-xs text-slate-700'>{user.email}</p>
                                    </div>
                                    <button className='btn btn-outline btn-sm border-pink-600 text-slate-900 ml-5' onClick={()=>{handleAddFriend(user._id)}}>ADD</button>
                                </div>
                            </div>
                        })}
                    </div>}
                </div>
            </div>}
        </div>
    )
}

export default UserSearch
