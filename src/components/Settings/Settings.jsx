import React, { useEffect, useState } from 'react'
import { IoMdSettings } from 'react-icons/io'
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";

const Settings = ({setDarkmode,darkmode}) => {

    console.log("MODE : ",darkmode)

    return (
        <div className='absolute'>
            <div className='w-full h-full bg-transparent rounded-md'>
                <div className='w-full h-full overflow-y-scroll mt-5'>
                    <div className='w-full h-full flex items-center justify-between p-2 mt-2 cursor-pointer'>
                        <div className='flex items-center'>
                            <IoMdSettings className='text-white text-5xl' />
                            <div className='ml-2'>
                                <h1 className='text-lg text-white'>Settings</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <hr className='opacity-50 my-5' />
                <div className='ml-2'>
                    <div className='flex mt-2 shadow-[0_3px_10px_rgb(0,0,0,0.4)] rounded-lg p-3'>
                        <p className='-rotate-90'>M O D E</p>
                        <button className='shadow-[0_3px_10px_rgb(0,0,0,0.4)] rounded-lg p-3'>
                            {darkmode ? <MdDarkMode size={40} className='fill-purple-600 glow-dark' onClick={() => setDarkmode(false) } /> : <MdLightMode size={40} className='fill-yellow-600 glow-light' onClick={() => setDarkmode(true) } />}
                        </button>
                        <p className='rotate-90'>{darkmode ? 'D A R K' : 'L I G H T'}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings
