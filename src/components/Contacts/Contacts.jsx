import React from 'react'
import { CiSearch } from 'react-icons/ci'

function Contacts() {
    return (
        <div className="m-2 w-3/6 p-3 rounded-lg bg-opacity-80 bg-center text-white backdrop-blur-sm shadow-[0px_0px_10px_1px_#2d3748]    max-md:w-auto max-md:h-5/6">
            <div className="relative text-gray-600 focus-within:text-gray-400 ">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                    <button type="submit" className="p-1 focus:outline-none focus:shadow-outline">
                        <CiSearch size={20} />
                    </button>
                </span>
                <input type="search" name="q" className="py-2 text-sm text-white bg-transparent rounded-md pl-10 focus:outline-none focus:text-gray-900" placeholder="Search..." autoComplete="off" />
            </div>
            <hr />
        </div>
    )
}

export default Contacts