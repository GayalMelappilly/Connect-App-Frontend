import React, { useContext } from 'react'
import { UserInfoContext } from '../../contexts/UserInfoContext'
import { StatusContext } from '../../contexts/AuthContext'
import axios from 'axios'

const Profile = () => {

    const { userInfo } = useContext(UserInfoContext)
    const { status, setStatus } = useContext(StatusContext)

    const HandleLogout = () => {
        axios.get('http://localhost:5000/auth/logout').then(() => {
            setStatus(false)
            document.cookie = `userData=;  Max-Age=-99999999;`;
            console.log("LOGOUT SUCCESSFUL.", status)
        })
    }

    return (
        <div className='absolute'>
            <div className='w-full h-full bg-transparent rounded-md'>
                <div className='w-full h-full overflow-y-scroll mt-5'>
                    <div className='w-full h-full flex items-center justify-between p-2 mt-2 cursor-pointer'>
                        <div className='flex items-center'>
                            <div className="avatar">
                                <div className="w-14 rounded-lg">
                                    <img src={userInfo.image} />
                                </div>
                            </div>
                            <div className='ml-2 pl-3'>
                                <h1 className='text-xl text-white'>{userInfo.displayName}</h1>
                                <p className='text-md text-slate-700'>{userInfo.email}</p>
                            </div>
                        </div>
                        {/* <div className='flex items-center'>
                                <button className='text-sm bg-blue-500 text-white rounded-md px-2 py-1'>View</button>
                            </div> */}
                    </div>
                </div>
            </div>
            <div className='relative'>
                <button className='text-sm bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600' onClick={HandleLogout}>Logout</button>
            </div>
        </div>
    )
}

export default Profile
