import React, { useContext, useEffect, useState } from 'react'
import { CiSearch } from 'react-icons/ci'
import { UserInfoContext } from '../../contexts/UserInfoContext'
import { ContactContext } from '../../contexts/ContactContext'
import axios from 'axios'
import { MdKeyboardArrowLeft, MdSettings } from "react-icons/md";
import { IoReorderThreeOutline } from "react-icons/io5";
import { MessageContext } from '../../contexts/MessageContext'
import { SocketContext } from '../../contexts/SocketContext'
import { FaUser, FaUserFriends } from 'react-icons/fa'
import { IoMdSettings } from 'react-icons/io'
import { MdLogout } from "react-icons/md";
import { PiDotsThreeOutlineVerticalBold } from "react-icons/pi";
import { IoIosRemoveCircle } from "react-icons/io";
import { Link } from 'react-router-dom'
import { StatusContext } from '../../contexts/AuthContext'
import MdProfile from '../MdProfile/MdProfile'
import MdUserSearch from '../MdUserSearch/MdUserSearch'
import MdSetting from '../MdSetting/MdSetting'

function Contacts() {

    const { userInfo } = useContext(UserInfoContext)
    const { contact } = useContext(ContactContext)
    const { messageInfo, setMessageInfo } = useContext(MessageContext)
    const { onlineUsers } = useContext(SocketContext)
    const { status, setStatus } = useContext(StatusContext)

    const [mdContactBar, setMdContactBar] = useState(null)
    const [allContacts, setAllContacts] = useState([])
    const [selection, setSelection] = useState(null);
    const [userToRemove, setUserToRemove] = useState(null)
    const [mdShowProfile, setMdShowProfile] = useState(false)
    const [mdShowSettings, setMdShowSettings] = useState(false)
    const [mdShowUserSearch, setMdShowUserSearch] = useState(false)
    const [mdProp, setMdProp] = useState(false)
    const [darkmode, setDarkmode] = useState(true)

    const handleClick = (index, contact) => {
        setSelection(index);
        setMdContactBar(contact);
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
        if (darkmode) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    })

    useEffect(() => {
        axios.post('http://localhost:5000/user/contacts', { userId: userInfo._id }).then((response) => {
            setAllContacts(response.data.contacts)
        })
    }, [userInfo])

    useEffect(() => {
        console.log('REMOVE : ', userToRemove)
    }, [userToRemove])

    const HandleLogout = () => {
        console.log("LOGOUT")
        axios.get('http://localhost:5000/auth/logout').then(() => {
            setStatus(false)
            document.cookie = `userData=;  Max-Age=-99999999;`;
            console.log("LOGOUT SUCCESSFUL.", status)
        })
    }

    const HandleRemoveFriend = (contact, userInfo) => {
        console.log('HANDLE REMOVE FRIEND : HandleRemoveFriend')
        // console.log("REMOVE FRIEND")
        // console.log(selection, index)
        axios.put('http://localhost:5000/user/remove-friend', { details: contact, user: userInfo }).then((response) => {
            console.log(response.data)
            setSelection(null)
        })
    }

    const HandleSetUserToRemove = (details) => {
        console.log("CLICKED! HandleSetUserToRemove")
        setUserToRemove(details)
        document.getElementById('my_modal_2').showModal()
    }

    useEffect(() => {
        setAllContacts(contact)
    }, [contact])

    return (
        <div className={`m-2 w-3/6 p-3 rounded-s-lg dark:bg-opacity-80 bg-center text-white dark:backdrop-blur-sm dark:bg-transparent dark:shadow-[0_3px_10px_rgb(0,0,0,0.4)] bg-emerald-100 shadow-gray-400 shadow-[1px_1px_8px_rgb(0,0,0,0.2)] transition-all ease-in-out duration-700 max-md:w-auto max-md:rounded-b-none ${messageInfo ? 'max-md:h-20' : 'max-md:h-5/6'}`}>
            {!mdProp  && <div className={`relative text-gray-600 focus-within:text-gray-400            max-md:flex  ${messageInfo ? 'max-md:hidden' : null} transition-all ease-in-out duration-700`}>
                <span className={`absolute inset-y-0 left-0 flex items-center pl-2 ${mdProp ? 'max-md:hidden' : 'max-md:opacity-100'}`}>
                    <button type="submit" className="p-1 focus:outline-none focus:shadow-outline">
                        <CiSearch size={20} />
                    </button>
                </span>
                <input type="search" name="q" className={`py-2 text-sm bg-transparent dark:bg-[#1B1E1C] rounded-md pl-10 focus:outline-none placeholder:text-black" `} placeholder="Search..." autoComplete="off" />

                {window.innerWidth <= 768 &&
                    <div className="dropdown dropdown-end absolute inset-y-0 right-0 flex items-center pr-2">
                        <div tabIndex={0} role="button" className="m-1 "><IoReorderThreeOutline size={25} className='font-bold text-emerald-500 active:text-emerald-700' /></div>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 bg-[#1B1E1C] rounded-s-md rounded-b-md w-52 mt-44 shadow-[0_3px_10px_rgb(0,0,0,0.4)]">
                            <li onClick={() => {
                                setMdShowProfile(true)
                                setMdProp(true)
                                setMdShowSettings(false)
                                setMdShowUserSearch(false)
                            }} className='text-white'><a><FaUser className='fill-white' />Profile</a></li>
                            <li onClick={() => {
                                setMdShowUserSearch(true)
                                setMdProp(true)
                                setMdShowProfile(false)
                                setMdShowSettings(false)
                            }} className='text-white'><a><FaUserFriends className='fill-white' />Add Friend</a></li>
                            <li onClick={() => {
                                setMdShowSettings(true)
                                setMdProp(true)
                                setMdShowProfile(false)
                                setMdShowUserSearch(false)
                            }} className='text-white'><a><IoMdSettings className='fill-white' />Settings</a></li>
                            <li onClick={HandleLogout} className='text-white'><a><MdLogout className='fill-white' />Logout</a></li>
                        </ul>
                    </div>}
            </div>}

            {mdShowProfile && <MdProfile setMdShowProfile={setMdShowProfile} setMdProp={setMdProp} />}
            {mdShowUserSearch && <MdUserSearch setMdShowUserSearch={setMdShowUserSearch} setMdProp={setMdProp} />}
            {mdShowSettings && <MdSetting setMdShowSettings={setMdShowSettings} setMdProp={setMdProp} setDarkmode={setDarkmode} darkmode={darkmode} />}

            {selection !== null && mdContactBar && window.innerWidth <= 768 && <div className={`relative text-gray-600 focus-within:text-gray-400 h-60`}>
                {/* {alert("REAched")} */}
                <div className='flex'>
                    <div>
                        <button className='bg-slate-300 h-full rounded-lg w-8' onClick={() => {
                            setSelection(null)
                            setMessageInfo(null)
                        }}><MdKeyboardArrowLeft size={30} className='fill-black mx-auto' /></button>
                    </div>
                    <div className='mx-1.5'></div>
                    <img className='rounded-lg w-14 h-14' src={`${mdContactBar.image}`} alt="" />
                    <div className='mx-1.5'></div>
                    <div>
                        <h1 className='text-xl text-white'>{mdContactBar.displayName}</h1>
                        <p className='text-emerald-500'>{mdContactBar.email}</p>
                    </div>
                    <div className={`dropdown dropdown-end inset-y-0 my-auto ml-auto`}>
                        <div tabIndex={0} role="button" className="m-1"><PiDotsThreeOutlineVerticalBold size={25} className='fill-emerald-500 duration-100 group-hover:opacity-100 p-30' /></div>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 bg-[#1B1E1C] rounded-s-md rounded-b-md w-52 shadow-[0_3px_10px_rgb(0,0,0,0.4)]">
                            <li><a><IoIosRemoveCircle className='fill-red-500' size={20} />Remove</a></li>
                        </ul>
                    </div>
                    <dialog id="my_modal_2" className="modal">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg">Do you want to remove this user?</h3>
                            <form method="dialog" className='flex mt-5 justify-end'>
                                <button className='btn bg-red-600 text-black btn-sm rounded-md hover:bg-red-500'>Remove</button>
                                <div className='mx-1'></div>
                                <button className='btn bg-emerald-600 text-black btn-sm rounded-md hover:bg-emerald-500'>Cancel</button>
                            </form>
                        </div>
                    </dialog>
                </div>
            </div>
            }
            {!mdProp && <hr className={`${messageInfo ? 'max-md:hidden' : null}`} />}
            <div className='h-2'></div>
            <div className={`flex flex-col ${mdProp ? 'hidden' : 'opacity-100'}    ${messageInfo ? 'max-md:hidden' : null}`}>
                {allContacts && allContacts.map((contact, index) => (
                    <div className={`w-full group h-full flex items-center cursor-pointer justify-between p-2 mt-2 hover:bg-slate-400 hover:bg-opacity-20 rounded-lg ${selection === index ? 'bg-slate-600 bg-opacity-20' : ''}`} key={index} onClick={() => handleClick(index, contact)} >
                        <label className='flex items-center'>
                            <div className='relative flex flex-col'>
                                <img src={contact.image} alt="" className='w-10 h-10 rounded-full' />
                                {onlineUsers.includes(contact._id) && <div className={`absolute inline-flex items-center justify-center w-2 h-2 text-xs font-bold text-white bg-green-500 border-2 border-none rounded-full`} key={contact._id}></div>}
                            </div>
                            <div className='ml-2'>
                                <h1 className='text-sm text-[#1B1E1C] dark:text-white'>{contact.displayName}</h1>
                                <p className='text-xs text-[#1B1E1C] dark:text-slate-400'>{contact.email}</p>
                            </div>
                        </label>


                        <div className={`${selection === index ? 'opacity-100' : 'opacity-0'} dropdown dropdown-end inset-y-0`}>
                            <div tabIndex={0} role="button" className="m-1"><PiDotsThreeOutlineVerticalBold className='fill-zinc-800 dark:fill-emerald-500 opacity-0 duration-100 group-hover:opacity-100 p-30' /></div>
                            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 bg-emerald-100 dark:bg-[#1B1E1C] rounded-s-md rounded-b-md w-52 shadow-[0_3px_10px_rgb(0,0,0,0.4)]">
                                <li><a onClick={() => HandleSetUserToRemove(contact)} className='dark:text-white text-black'><IoIosRemoveCircle className='fill-red-500' size={20} key={index} />Remove</a></li>
                            </ul>
                        </div>
                        <dialog id="my_modal_2" className="modal" key={index}>
                            <div className="modal-box">
                                <h3 className="font-bold text-lg">Do you want to remove this user?</h3>
                                <form method="dialog" className='flex mt-5 justify-end'>
                                    <button className='btn bg-red-600 text-black btn-sm rounded-md hover:bg-red-500' key={index} onClick={() => selection == index ? HandleRemoveFriend(contact, userInfo) : null}>Remove</button>
                                    <div className='mx-1'></div>
                                    <button className='btn bg-emerald-600 text-black btn-sm rounded-md hover:bg-emerald-500'>Cancel</button>
                                </form>
                            </div>
                        </dialog>

                    </div>
                ))}
            </div>
        </div>
    )
}

export default Contacts