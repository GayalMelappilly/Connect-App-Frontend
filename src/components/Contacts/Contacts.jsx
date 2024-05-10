import React, { useContext, useEffect, useState } from 'react'
import { CiSearch } from 'react-icons/ci'
import { UserInfoContext } from '../../contexts/UserInfoContext'
import { ContactContext } from '../../contexts/ContactContext'
import axios from 'axios'
import { MessageContext } from '../../contexts/MessageContext'
import { SocketContext } from '../../contexts/SocketContext'

function Contacts() {

    const { userInfo } = useContext(UserInfoContext)
    const { contact } = useContext(ContactContext)
    const { messageInfo, setMessageInfo } = useContext(MessageContext)
    const {onlineUsers} = useContext(SocketContext)

    const [allContacts, setAllContacts] = useState([])
    const [selection, setSelection] = useState(null);

    const handleClick = (index, contact) => {
        setSelection(index);
        console.log("CLICKED ", contact)
        axios.post('http://localhost:5000/message/get/', { senderId: userInfo._id, receiverId: contact._id }).then((response) => {
            console.log("RESPONSE ", response)
            if (response) {
                const receiverInfo = {
                    _id: contact._id,
                    name: contact.displayName,
                    email: contact.email,
                    image: contact.image,
                    messages: response.data?.messages
                }
                console.log("RECEIVER INFO ", receiverInfo)
                if (receiverInfo) {
                    setMessageInfo(receiverInfo)
                    console.log("UPDATED INFO")
                }
            }
        })
    }

    useEffect(() => {
        axios.post('http://localhost:5000/user/contacts', { userId: userInfo._id }).then((response) => {
            setAllContacts(response.data.contacts)
        })
    }, [userInfo])

    useEffect(() => {
        setAllContacts(contact)
    }, [contact])

    return (
        <div className="m-2 w-3/6 p-3 rounded-s-lg bg-opacity-80 bg-center text-white backdrop-blur-sm shadow-[0_3px_10px_rgb(0,0,0,0.4)] max-md:w-auto max-md:h-5/6">
            <div className="relative text-gray-600 focus-within:text-gray-400 ">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                    <button type="submit" className="p-1 focus:outline-none focus:shadow-outline">
                        <CiSearch size={20} />
                    </button>
                </span>
                <input type="search" name="q" className="py-2 text-sm text-white bg-transparent rounded-md pl-10 focus:outline-none" placeholder="Search..." autoComplete="off" />
            </div>
            <hr />
            <div className='h-2'></div>
            <div className="flex flex-col">
                {allContacts && allContacts.map((contact, index) => (
                    <div className={`w-full h-full flex items-center cursor-pointer justify-between p-2 mt-2 hover:bg-slate-400 hover:bg-opacity-20 rounded-lg ${selection === index ? 'bg-slate-600 bg-opacity-20' : ''}`} key={index} onClick={() => handleClick(index, contact)} >
                        <label className='flex items-center'>
                            <div className='relative flex flex-col'>
                                <img src={contact.image} alt="" className='w-10 h-10 rounded-full' />
                                {onlineUsers.includes(contact._id) && <div className={`absolute inline-flex items-center justify-center w-2 h-2 text-xs font-bold text-white bg-green-500 border-2 border-none rounded-full`} key={contact._id}></div>}
                            </div>
                            <div className='ml-2'>
                                <h1 className='text-sm text-white'>{contact.displayName}</h1>
                                <p className='text-xs text-slate-400'>{contact.email}</p>
                            </div>
                        </label>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Contacts