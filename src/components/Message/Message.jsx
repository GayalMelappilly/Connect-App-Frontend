import React from 'react'

function Message() {
    return (
        <div className="w-full bg-opacity-80 m-2 rounded-lg p-5 backdrop-blur-sm shadow-[0px_0px_10px_1px_#2d3748] max-md:w-0 max-md:hidden">
            <div className='w-5/6 absolute bottom-4 flex justify-center items-center '>

                <input type="search" name="q" className="py-2 w-full text-sm text-white bg-transparent pl-10 focus:outline-none focus:text-gray-900 rounded-3xl placeholder:text-white shadow-[0px_0px_6px_0px_#2d3748] " placeholder="Message" autoComplete='off' />
                <div className='px-2'></div>
                <button className='py-2 text-sm text-white bg-transparent px-12 focus:outline-none focus:text-gray-900 rounded-3xl shadow-[0px_0px_6px_0px_#2d3748]'>Send</button>
            </div>
        </div>
    )
}

export default Message