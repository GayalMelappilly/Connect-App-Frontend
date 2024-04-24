import React, { useContext, useEffect, useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { IoMdSettings } from 'react-icons/io'
import { IoAdd } from 'react-icons/io5'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../contexts/AuthContext';

function Sidebar(props) {

    const [optionClick, setOptionClick] = useState(false)
    const [profileClick, setProfileClick] = useState(false)
    const [settingsClick, setSettingsClick] = useState(false)
    const [addClick, setAddClick] = useState(false)
    const [username, setUsername] = useState(null)
    const [user, setUser] = useState(null)
    const [currentUser, setCurrentUser] = useState(null)

    const { userInfo, setUserInfo } = useContext(UserContext)

    const navigate = useNavigate()

    useEffect(() => {
        console.log("INFO : ", userInfo)
    }, [userInfo])

    const HandleLogout = () => {
        axios.post('http://localhost:3001/connect/logout', {}, { withCredentials: true }).then((response) => {
            console.log(response.data)
            setCurrentUser(null)
            navigate('/login')
        })
    }

    useEffect(() => {
        setCurrentUser(props.userInfo)
        console.log('PROPS : ' + JSON.stringify(currentUser, null, 2))
    }, [props.userInfo])

    return (
        <div className={`${optionClick ? 'w-11/12' : 'w-2/12'}  transition-all ease-in-out duration-200 bg-opacity-80 bg-center m-2 rounded-lg p-5  backdrop-blur-sm shadow-[0px_0px_10px_1px_#2d3748] max-md:w-0 max-lg:hidden`}>
            {profileClick && <div className='absolute'>
                <div className='w-full h-full bg-transparent rounded-md'>
                    <div className='w-full h-full overflow-y-scroll mt-5'>
                        <div className='w-full h-full flex items-center justify-between p-2 mt-2 cursor-pointer'>
                            <div className='flex items-center'>
                                <div class="avatar">
                                    <div class="w-14 rounded-lg">
                                        <img src={userInfo.image} />
                                    </div>
                                </div>
                                <div className='ml-2'>
                                    <h1 className='text-lg text-white'></h1>
                                    <p className='text-xl pl-5 text-slate-700'>{userInfo.displayName}</p>
                                </div>
                            </div>
                            {/* <div className='flex items-center'>
                                <button className='text-sm bg-blue-500 text-white rounded-md px-2 py-1'>View</button>
                            </div> */}
                        </div>
                    </div>
                </div>
                <div className='flex items-center justify-between p-2 mt-2 cursor-pointer'>
                    <button className='text-sm bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600' onClick={HandleLogout}>Logout</button>
                </div>
            </div>}

            {settingsClick && <div className='absolute'>
                <div className='w-full h-full bg-transparent rounded-md'>
                    <div className='w-full h-full overflow-y-scroll mt-5'>
                        <div className='w-full h-full flex items-center justify-between p-2 mt-2 hover:bg-gray-200 cursor-pointer'>
                            <div className='flex items-center'>
                                <IoMdSettings className='text-white text-5xl' />
                                <div className='ml-2'>
                                    <h1 className='text-lg text-white'>Settings</h1>
                                    <p className='text-sm text-slate-700'>View your profile details</p>
                                </div>
                            </div>
                            {/* <div className='flex items-center'>
                                <button className='text-sm bg-blue-500 text-white rounded-md px-2 py-1'>View</button>
                            </div> */}
                        </div>
                        <div className='w-full h-full flex items-center justify-between p-2 mt-2 hover:bg-gray-200 cursor-pointer'></div>
                        <div className='w-full h-full flex items-center justify-between p-2 mt-2 hover:bg-gray-200 cursor-pointer'></div>
                    </div>
                </div>
            </div>}

            {addClick && <div className='absolute'>
                <input type="search" name="q" class="py-2 text-sm text-white bg-transparent rounded-md pl-10 focus:outline-none " placeholder="Search for username" autocomplete="off" value={username} onChange={(e) => { setUsername(e.target.value) }} />
                {user && <div className='absolute w-full'>
                    <div className='w-full h-full bg-transparent rounded-md'>
                        <div className='w-full h-full overflow-y-scroll mt-5'>
                            {user.map((user, index) => {
                                return <div className='w-full h-full flex items-center justify-between p-2 mt-2 hover:bg-gray-200 cursor-pointer' key={index}>
                                    <div className='flex items-center'>
                                        <img src={user.profile_pic} alt="" className='w-10 h-10 rounded-full' />
                                        <div className='ml-2'>
                                            <h1 className='text-sm text-white'>{user.fname}</h1>
                                            <p className='text-xs text-slate-700'>{user.email}</p>
                                        </div>
                                    </div>
                                    <div className='flex items-center'>
                                        {/* <button className='text-sm bg-blue-500 text-white rounded-md px-2 py-1'>Follow</button>
                                        <button className='text-sm bg-blue-500 text-white rounded-md px-2 py-1 ml-2'>Message</button>
                                        <button className='text-sm bg-blue-500 text-white rounded-md px-2 py-1 ml-2'>Block</button>
                                        <button className='text-sm bg-blue-500 text-white rounded-md px-2 py-1 ml-2'>Report</button>
                                        <button className='text-sm bg-blue-500 text-white rounded-md px-2 py-1 ml-2'>Delete</button> */}
                                    </div>
                                </div>
                            })}
                        </div>
                    </div>
                </div>}
            </div>}
            <div className='grid mx-8 fixed right-0 h-full my-10'>
                <FaUser size={50} color='white' className='cursor-pointer' onClick={() => {
                    setOptionClick(!optionClick)
                    setProfileClick(optionClick ? false : true)
                    setAddClick(false)
                    setSettingsClick(false)
                }} />
                <IoMdSettings size={50} color='white' className='my-10 cursor-pointer' onClick={() => {
                    setOptionClick(!optionClick)
                    setSettingsClick(optionClick ? false : true)
                    setAddClick(false)
                    setProfileClick(false)
                }} />
                <IoAdd size={50} color='white' className='cursor-pointer' onClick={() => {
                    setOptionClick(!optionClick)
                    setAddClick(optionClick ? false : true)
                    setProfileClick(false)
                    setSettingsClick(false)
                }} />
            </div>
        </div>
    )
}

export default Sidebar