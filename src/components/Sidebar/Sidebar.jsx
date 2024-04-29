import React, { useContext, useEffect, useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { IoMdSettings } from 'react-icons/io'
import { IoAdd } from 'react-icons/io5'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { StatusContext } from '../../contexts/AuthContext';
import { UserInfoContext } from '../../contexts/UserInfoContext'
import Profile from '../Profile/Profile'
import Settings from '../Settings/Settings'
import UserSearch from '../UserSearch/UserSearch'

function Sidebar() {

    const [optionClick, setOptionClick] = useState(false)
    const [profileClick, setProfileClick] = useState(false)
    const [settingsClick, setSettingsClick] = useState(false)
    const [addClick, setAddClick] = useState(false)

    return (
        <div className={`${optionClick ? 'w-11/12' : 'w-2/12'}  transition-all ease-in-out duration-200 bg-opacity-80 bg-center m-2 rounded-lg p-5  backdrop-blur-sm shadow-[0px_0px_10px_1px_#2d3748] max-md:w-0 max-lg:hidden`}>

            {profileClick && <Profile />}
            {settingsClick && <Settings />}
            {addClick && <UserSearch />}

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