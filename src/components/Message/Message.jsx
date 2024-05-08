import React, { useContext, useEffect, useState } from 'react';
import SenderChat from '../SenderChat/SenderChat';
import ReceiverChat from '../ReceiverChat/ReceiverChat';
import { UserInfoContext } from '../../contexts/UserInfoContext';
import { MessageContext } from '../../contexts/MessageContext';
import { SocketContext } from '../../contexts/SocketContext';
import axios from 'axios';
import useListenMessages from '../../hooks/useListenMessages';
import getCurrentTime from '../../hooks/getCurrentTime';

function Message() {
    const [text, setText] = useState('');
    const [currentTime, setCurrentTime] = useState('')

    const { messageInfo, setMessageInfo } = useContext(MessageContext);
    const { userInfo } = useContext(UserInfoContext);
    const { socket } = useContext(SocketContext);

    useListenMessages()

    useEffect(() => {
        console.log("MESSAGE INFO : ", messageInfo);
        console.log("TIME : ",currentTime)
    }, [messageInfo]);

    const handleSend = () => {
        axios.post('http://localhost:5000/message/send/', { userInfo, messageInfo, text })
            .then((response) => {
                console.log(response.data);
            });
    };
    
    return (
        <div className="w-full bg-opacity-80 m-2 p-5 backdrop-blur-sm shadow-[0_3px_10px_rgb(0,0,0,0.4)] max-md:w-0 max-md:hidden">
            <div className='overflow-scroll h-5/6 rounded-lg p-5 backdrop-blur-sm'>
                {messageInfo && messageInfo.messages && messageInfo.messages.map((msg, index) => (
                    <div key={index}>
                        {userInfo._id === msg.senderId ? <SenderChat message={msg.message} currentTime={getCurrentTime(msg.createdAt)} /> : <ReceiverChat message={msg.message} currentTime={getCurrentTime(msg.createdAt)} />}
                    </div>
                ))}
            </div>
            <hr className='border-green-200' />
            <div className='w-11/12 h-auto absolute bottom-4 flex justify-center items-center'>
                <input type="search" name="q" className="py-2 w-full text-sm text-white bg-transparent pl-10 focus:outline-none rounded-3xl placeholder:text-white shadow-[0px_0px_6px_0px_#2d3748] " placeholder="Message" autoComplete='off' value={text} onChange={(e) => { setText(e.target.value) }} />
                <div className='px-2'></div>
                <button className='py-2 text-sm text-white bg-transparent px-12 focus:outline-none focus:text-gray-900 rounded-3xl shadow-[0px_0px_6px_0px_#2d3748]' onClick={handleSend}>Send</button>
            </div>
        </div>
    );
}

export default Message;
