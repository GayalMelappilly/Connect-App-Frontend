import React, { useContext, useEffect, useRef, useState } from 'react';
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
        <div className="w-full bg-opacity-80 m-2 p-5 backdrop-blur-sm shadow-[0_3px_10px_rgb(0,0,0,0.4)] max-md:w-0 max-md:hidden">
            {messageInfo ? <div>
                <div className='overflow-scroll h-5/6 rounded-lg p-5 backdrop-blur-sm'>
                    {messageInfo && messageInfo.messages && messageInfo.messages.map((msg, index) => (
                        <div key={index}>
                            {userInfo._id === msg.senderId ? <SenderChat index={index} message={msg.message} currentTime={getCurrentTime(msg.createdAt)} /> : <ReceiverChat index={index} previousIndex={index === 0 ? -1 : index - 1} message={msg.message} currentTime={getCurrentTime(msg.createdAt)} />}
                            <div ref={messagesEndRef} />
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
                :
                <div class="mt-16">
                    <div class='align-middle'>
                        <h1 class='pt-20 inset-0 text-white text-6xl peace-sans max-sm:text-5xl uppercase flex justify-center'>connect</h1>
                        <p class='mt-5 text-emerald-500 font-thin text-2xl adelia-font flex justify-center'>Say it with connect.</p>
                    </div>
                </div>}
        </div>
    );
}

export default Message;
