import React from 'react'
import { IoMdSettings } from 'react-icons/io'

const Settings = () => {
    return (
        <div className='absolute'>
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
        </div>
    )
}

export default Settings
