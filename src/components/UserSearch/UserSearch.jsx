import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { CiSearch } from 'react-icons/ci'
import { IoIosCheckmark } from "react-icons/io";
import { IoIosClose } from "react-icons/io";
import { UserInfoContext } from '../../contexts/UserInfoContext'
import { ContactContext } from '../../contexts/ContactContext';

const UserSearch = () => {

    const [username, setUsername] = useState('')
    const [friendReq, setFriendReq] = useState(null)
    const [showReq, setShowReq] = useState(false)
    const [user, setUser] = useState([])

    const { userInfo } = useContext(UserInfoContext)
    const { setContact } = useContext(ContactContext)

    useEffect(() => {
        axios.get(`http://localhost:5000/user/list?search=${username}`).then((response) => {
            setUser(response.data)
        })
    }, [username])

    useEffect(() => {
        axios.get(`http://localhost:5000/user/request-list?id=${userInfo._id}`).then((response) => {
            // console.log("REQ LIST : ", response.data)
            setFriendReq(response.data)
        })
    },[])

    const handleAddFriend = (user) => {
        axios.post(`http://localhost:5000/user/add-friend`, { senderDetails: userInfo, receiverDetails: user }).then((response) => {
            // console.log(response.data)
        })
        console.log(user._id, ' / ', userInfo._id)
    }

    const handleAccept = (user) => {
        axios.put('http://localhost:5000/user/req-accept', {reqFrom : user, reqTo: userInfo}).then((response)=>{
            console.log("AFTER REQ ACC : ",response.data)
            setContact(response.data.contacts)
        })  
    }

    const handleDecline = (user) => {
        axios.put('http://localhost:5000/user/req-decline', {reqFrom : user, reqTo: userInfo}).then((response)=>{
            console.log(response.data)
        })
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
            <button className='btn btn-sm mt-2 btn-outline text-slate-300' onClick={() => setShowReq(!showReq)}>{showReq ? 'Hide' : 'Friend Requests'}</button>
            {showReq && friendReq && <div>
                {friendReq.incomingRequests.map((user, index) => {
                    return <div className='w-full h-full flex items-center justify-between p-2 mt-2' key={index}>
                        <div className='flex items-center'>
                            <img src={user.image} alt="" className='w-10 h-10 rounded-full' />
                            <div className='ml-2'>
                                <h1 className='text-sm text-white'>{user.displayName}</h1>
                                <p className='text-xs text-slate-700'>{user.email}</p>
                            </div>
                            <div className={` ${friendReq ? 'cursor-pointer' : 'pointer-events-none'} ml-5`}>
                                <IoIosCheckmark size={20} className='btn h-2 btn-sm btn-square btn-ghost border-slate-400 rounded-xl text-green-600   hover:bg-green-600 hover:text-black' onClick={()=>handleAccept(user)}/>
                                <IoIosClose size={20} className='btn btn-sm btn-square btn-ghost border-slate-400 rounded-xl ml-2 text-red-700   hover:bg-red-700 hover:text-black' onClick={()=>handleDecline(user)}/>
                            </div>
                        </div>
                    </div>
                })}
            </div>}
            {user && <div className='absolute w-full'>
                <div className='w-full h-fullrounded-md'>
                    {username && <div className='w-full h-full overflow-y-scroll mt-5'>
                        {user.map((user, index) => {
                            return <div className='w-full h-full flex items-center justify-between p-2 mt-2cursor-pointer' key={index}>
                                <div className='flex items-center'>
                                    <img src={user.image} alt="" className='w-10 h-10 rounded-full' />
                                    <div className='ml-2'>
                                        <h1 className='text-sm text-white'>{user.displayName}</h1>
                                        <p className='text-xs text-slate-700'>{user.email}</p>
                                    </div>
                                    <button className='btn btn-outline btn-sm border-pink-600 text-slate-900 ml-5' onClick={() => { handleAddFriend(user) }}>ADD</button>
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
