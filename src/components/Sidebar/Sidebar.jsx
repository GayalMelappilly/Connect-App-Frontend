import React, { useContext, useEffect, useState } from 'react'
import { FaUser, FaUserFriends } from 'react-icons/fa'
import { IoMdSettings } from 'react-icons/io'
import { BsArrowRightSquareFill } from "react-icons/bs";
import Profile from '../Profile/Profile'
import Settings from '../Settings/Settings'
import UserSearch from '../UserSearch/UserSearch'
import { UserInfoContext } from '../../contexts/UserInfoContext';
import axios from 'axios';

function Sidebar() {

    const [optionClick, setOptionClick] = useState(false)
    const [profileClick, setProfileClick] = useState(false)
    const [settingsClick, setSettingsClick] = useState(false)
    const [addClick, setAddClick] = useState(false)

    const [reqCount, setReqCount] = useState(null)

    const { userInfo } = useContext(UserInfoContext)

    useEffect(() => {
        axios.get(`http://localhost:5000/user/request-list?id=${userInfo._id}`).then((response) => {
            if(response.data){
                setReqCount(response.data.incomingRequests.length)
            }
        })
    })

    return (
        <div className={`${optionClick ? 'w-7/12' : 'w-1/12'} relative  transition-all ease-in-out duration-200 bg-opacity-80 bg-center m-2 rounded-e-lg p-5  backdrop-blur-sm shadow-[0_3px_10px_rgb(0,0,0,0.4)] max-md:w-0 max-lg:hidden`}>

            {profileClick && <Profile />}
            {settingsClick && <Settings />}
            {addClick && <UserSearch />}

            <div className={`grid mx-auto h-full`}>

                <div className={`${optionClick ? 'opacity-100 cursor-pointer' : 'opacity-0'} transition-all ease-in-out duration-100 right-4 absolute`}>
                    <BsArrowRightSquareFill size={25} className='fill-slate-200' onClick={() => {
                        setOptionClick(false)
                        setProfileClick(false)
                        setSettingsClick(false)
                        setAddClick(false)
                    }} />
                </div>

                <div className={`${optionClick ? 'opacity-0 pointer-events-none' : 'opacity-100'} relative my-auto`} onClick={() => {
                    setOptionClick(!optionClick)
                    setProfileClick(optionClick ? false : true)
                    setAddClick(false)
                    setSettingsClick(false)
                }}>
                    <FaUser size={50} color='white' className='transition-all ease-in-out duration-100 cursor-pointer m-auto' />
                </div>

                <div className={`${optionClick ? 'opacity-0 pointer-events-none' : 'opacity-100'} relative my-auto`} onClick={() => {
                    setOptionClick(!optionClick)
                    setSettingsClick(optionClick ? false : true)
                    setAddClick(false)
                    setProfileClick(false)
                }}>
                    <IoMdSettings size={50} color='white' className='transition-all ease-in-out duration-100 cursor-pointer m-auto' />
                </div>

                <div className={`${optionClick ? 'opacity-0 pointer-events-none' : 'opacity-100'} relative my-auto`} onClick={() => {
                    setOptionClick(!optionClick)
                    setAddClick(optionClick ? false : true)
                    setProfileClick(false)
                    setSettingsClick(false)
                }}>
                    <FaUserFriends size={50} color='white' className='transition-all ease-in-out duration-100 cursor-pointer m-auto' />
                    {reqCount>0 && <div className={`${optionClick ? 'opacity-0' : 'opacity-100 cursor-pointer'} transition-all ease-in duration-700 absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-600 border-2 border-none rounded-lg -top-2 -end-2`}>{reqCount}</div>}
                </div>

            </div>
        </div>
    )
}

export default Sidebar