import React, { useContext, useEffect, useState } from 'react'
import SenderChat from '../SenderChat/SenderChat'
import ReceiverChat from '../ReceiverChat/ReceiverChat'
import { UserInfoContext } from '../../contexts/UserInfoContext'
import { MessageContext } from '../../contexts/MessageContext'
import axios from 'axios'

function Message() {

    const [message, setMessage] = useState('')
    const [text, setText] = useState([])

    const { userInfo } = useContext(UserInfoContext)
    const { messageInfo } = useContext(MessageContext)

    const handleSend = () => {
        setText([...text, message])
        setMessage('')
        axios.post('http://localhost:5000/message/', {userInfo, messageInfo, message}).then((response)=>{
            console.log(response.data)
        })
    }

    useEffect(()=>{
        console.log("MESSAGE INFO : ", messageInfo)
    })

    return (
        <div className="w-full bg-opacity-80 m-2 rounded-lg p-5 backdrop-blur-sm shadow-[0px_0px_10px_1px_#2d3748] max-md:w-0 max-md:hidden">
            <div className='overflow-scroll h-5/6 rounded-lg p-5 backdrop-blur-sm'>
                {text && text.map((msg, index) => {
                    return (
                        <div key={index}>
                            <SenderChat message={msg} />
                            {/* <ReceiverChat /> */}
                        </div>
                    )
                })}
            </div>
            <hr />
            <div className='w-11/12 h-auto absolute bottom-4 flex justify-center items-center'>
                <input type="search" name="q" className="py-2 w-full text-sm text-white bg-transparent pl-10 focus:outline-none focus:text-gray-900 rounded-3xl placeholder:text-white shadow-[0px_0px_6px_0px_#2d3748] " placeholder="Message" autoComplete='off' value={message} onChange={(e) => { setMessage(e.target.value) }} />
                <div className='px-2'></div>
                <button className='py-2 text-sm text-white bg-transparent px-12 focus:outline-none focus:text-gray-900 rounded-3xl shadow-[0px_0px_6px_0px_#2d3748]' onClick={handleSend}>Send</button>
            </div>
        </div>
    )
}

export default Message