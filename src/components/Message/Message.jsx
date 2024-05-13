import React, { useContext, useEffect, useRef, useState } from 'react';
import SenderChat from '../SenderChat/SenderChat';
import ReceiverChat from '../ReceiverChat/ReceiverChat';
import { UserInfoContext } from '../../contexts/UserInfoContext';
import { MessageContext } from '../../contexts/MessageContext';
import { SocketContext } from '../../contexts/SocketContext';
import axios from 'axios';
import { AiOutlineSend } from "react-icons/ai";
import useListenMessages from '../../hooks/useListenMessages';
import getCurrentTime from '../../hooks/getCurrentTime.js';

function Message() {
    const [text, setText] = useState('');
    const [currentTime, setCurrentTime] = useState('')
    const [previousIndex, setPreviousIndex] = useState(-1);

    const { messageInfo, setMessageInfo } = useContext(MessageContext);
    const { userInfo } = useContext(UserInfoContext);
    const { socket } = useContext(SocketContext);

    useListenMessages()

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messageInfo]);

    useEffect(() => {
        console.log("MESSAGE INFO : ", messageInfo);
        console.log("TIME : ", currentTime)
    }, [messageInfo]);

    const handleSend = () => {
        axios.post('http://localhost:5000/message/send/', { userInfo, messageInfo, text })
            .then((response) => {
                console.log(response.data);
            });
        setText('')
    };

    return (
        <div id='message' className={`w-full bg-opacity-80 m-2 p-5 backdrop-blur-sm shadow-[0_3px_10px_rgb(0,0,0,0.4)] transition-all duration-700 ease-in-out ${messageInfo ? 'max-md:h-5/6' : 'max-md:h-20'} max-md:w-auto max-md:rounded-lg`}>
            {messageInfo ? <div className=''>
                <div className='absolute overflow-scroll h-96 w-full rounded-lg pr-10 backdrop-blur-sm max-md:h-5/6'>
                    {messageInfo && messageInfo.messages && messageInfo.messages.map((msg, index) => (
                        // console.log("MESSAGE : ", msg),
                        <div key={index}>
                            {userInfo._id === msg.senderId ? <SenderChat  index={index} message={msg.message} details={msg} currentTime={getCurrentTime(msg.createdAt)} /> : <ReceiverChat index={index} previousIndex={index === 0 ? -1 : index - 1} message={msg.message} currentTime={getCurrentTime(msg.createdAt)} />}
                            <div ref={messagesEndRef} />
                        </div>
                    ))}
                </div>
                <div className='w-full h-auto absolute bottom-4 flex '>
                    <input type="search" name="q" className="py-2 w-8/12 text-sm text-white bg-transparent pl-10 focus:outline-none rounded-md placeholder:text-white placeholder:text-opacity-30 shadow-[0_3px_10px_rgb(0,0,0,0.4)]           max-md:w-9/12 max-md:pl-5" placeholder="Message" autoComplete='off' value={text} onChange={(e) => { setText(e.target.value) }} />
                    <div className='px-2    max-md:px-1'></div>
                    <button className='py-2 text-sm text-emerald-500 bg-transparent px-12 focus:outline-none focus:text-gray-900 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.4)]            max-md:p-3' onClick={handleSend}>{window.innerWidth <= 768 ? <AiOutlineSend className='fill-emerald-500' /> : 'Send'}</button>
                </div>
            </div>
                :
                <div className="mt-16    max-md:mt-0 max-md:h-3/6 max-md:absolute">
                    <div className='align-middle max-md:flex'>
                        <h1 className='pt-20 inset-0 text-white text-6xl peace-sans uppercase flex justify-center          max-md:pt-0 max-md:text-4xl max-md:my-1        dark:text-red-600'>connect</h1>
                        <div className='max-md:mx-8'></div>
                        <p className='mt-5 text-emerald-500 font-thin text-2xl adelia-font flex justify-center             max-md:mt-0 max-md:py-3 max-md:text-sm '>Say it with connect.</p>
                    </div>
                </div>}
        </div>
    );
}

export default Message;
