import React, { useContext, useEffect, useState } from 'react'
import { CiSearch } from 'react-icons/ci'
import { UserInfoContext } from '../../contexts/UserInfoContext'
import axios from 'axios'

function Contacts() {

    const [contacts, setContacts] = useState()

    const { userInfo } = useContext(UserInfoContext)

    useEffect(()=>{
        axios.put('http://localhost:5000/user/contacts', {userId: userInfo._id}).then((response)=>{
            if(response.data){
                setContacts(response.data.contacts)
            }
        })
    },[])
    
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
            <div className="flex flex-col">
                {contacts && contacts.map((contact, index)=>(
                    <div className='w-full h-full flex items-center justify-between p-2 mt-2' key={index}>
                        <div className='flex items-center'>
                            <img src={contact.image} alt="" className='w-10 h-10 rounded-full' />
                            <div className='ml-2'>
                                <h1 className='text-sm text-white'>{contact.displayName}</h1>
                                <p className='text-xs text-slate-700'>{contact.email}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Contacts