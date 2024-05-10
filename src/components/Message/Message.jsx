import React, { useContext, useEffect, useRef, useState } from 'react';
import SenderChat from '../SenderChat/SenderChat';
import ReceiverChat from '../ReceiverChat/ReceiverChat';
import { UserInfoContext } from '../../contexts/UserInfoContext';
import { MessageContext } from '../../contexts/MessageContext';
import { SocketContext } from '../../contexts/SocketContext';
import axios from 'axios';
import { AiOutlineSend } from "react-icons/ai";
import useListenMessages from '../../hooks/useListenMessages';
import getCurrentTime from '../../hooks/getCurrentTime';

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
        <div id='message' className={`w-full bg-opacity-80 m-2 p-5 backdrop-blur-sm shadow-[0_3px_10px_rgb(0,0,0,0.4)]      ${messageInfo ? 'max-md:flex-grow' : 'max-md:h-20'} max-md:w-auto max-md:rounded-lg`}>
            {messageInfo ? <div className='           '>
                <div className='overflow-scroll h-5/6 rounded-lg p-5 backdrop-blur-sm'>
                    {messageInfo && messageInfo.messages && messageInfo.messages.map((msg, index) => (
                        <div key={index}>
                            {userInfo._id === msg.senderId ? <SenderChat index={index} message={msg.message} currentTime={getCurrentTime(msg.createdAt)} /> : <ReceiverChat index={index} previousIndex={index === 0 ? -1 : index - 1} message={msg.message} currentTime={getCurrentTime(msg.createdAt)} />}
                            <div ref={messagesEndRef} />
                        </div>
                    ))}
                </div>
                <hr className='border-green-200 bottom-0' />
                <div className='w-full h-auto absolute bottom-4 flex '>
                    <input type="search" name="q" className="py-2 w-8/12 text-sm text-white bg-transparent pl-10 focus:outline-none rounded-md placeholder:text-white placeholder:text-opacity-30 shadow-[0_3px_10px_rgb(0,0,0,0.4)]           max-md:w-9/12 max-md:pl-5" placeholder="Message" autoComplete='off' value={text} onChange={(e) => { setText(e.target.value) }} />
                    <div className='px-2    max-md:px-1'></div>
                    <button className='py-2 text-sm text-emerald-500 bg-transparent px-12 focus:outline-none focus:text-gray-900 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.4)]            max-md:p-3' onClick={handleSend}>{window.innerWidth <= 768 ? <AiOutlineSend className='fill-emerald-500' /> : 'Send'}</button>
                </div>
            </div>
                :
                <div className="mt-16               max-md:hidden">
                    <div className='align-middle'>
                        <h1 className='pt-20 inset-0 text-white text-6xl peace-sans max-sm:text-5xl uppercase flex justify-center           dark:text-red-600'>connect</h1>
                        <p className='mt-5 text-emerald-500 font-thin text-2xl adelia-font flex justify-center'>Say it with connect.</p>
                    </div>
                </div>}
        </div>
    );
}

export default Message;
