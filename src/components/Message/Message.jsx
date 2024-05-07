import React, { useContext, useEffect, useState } from 'react';
import SenderChat from '../SenderChat/SenderChat';
import ReceiverChat from '../ReceiverChat/ReceiverChat';
import { UserInfoContext } from '../../contexts/UserInfoContext';
import { MessageContext } from '../../contexts/MessageContext';
import { SocketContext } from '../../contexts/SocketContext';
import axios from 'axios';
// import useListenMessages from '../../hooks/useListenMessages';

function Message() {
    const [text, setText] = useState('');
    const { messageInfo, setMessageInfo } = useContext(MessageContext);
    const { userInfo } = useContext(UserInfoContext);
    const { socket } = useContext(SocketContext);

    useEffect(() => {
        console.log("Trying to set up socket event listener...");
        try {
            socket?.on("newMessage", (newMessage) => {
                console.log("REACHED SOCKET CONTEXT");
                console.log("NEW MESSAGE : ", newMessage);
                console.log("MESSAGE INFO : ", messageInfo);
                const updatedMessages = [...messageInfo.messages, newMessage];
                console.log("UPDATED MSG : ", updatedMessages);

                setMessageInfo(prevState => ({
                    ...prevState,
                    messages: updatedMessages
                }));
            });
            console.log("Socket event listener successfully set up.");
        } catch (error) {
            console.error("Error setting up socket event listener:", error);
        }

        return () => {
            socket?.off("newMessage");
        };
    }, [socket, setMessageInfo, messageInfo]);

    useEffect(() => {
        console.log("MESSAGE INFO : ", messageInfo);
    }, [messageInfo]);

    const handleSend = () => {
        axios.post('http://localhost:5000/message/send/', { userInfo, messageInfo, text })
            .then((response) => {
                console.log(response.data);
            });
    };

    return (
        <div className="w-full bg-opacity-80 m-2 rounded-lg p-5 backdrop-blur-sm shadow-[0px_0px_10px_1px_#2d3748] max-md:w-0 max-md:hidden">
            <div className='overflow-scroll h-5/6 rounded-lg p-5 backdrop-blur-sm'>
                {messageInfo && messageInfo.messages && messageInfo.messages.map((msg, index) => (
                    <div key={index}>
                        {userInfo._id === msg.senderId ? <SenderChat message={msg.message} /> : <ReceiverChat message={msg.message} />}
                    </div>
                ))}
            </div>
            <hr />
            <div className='w-11/12 h-auto absolute bottom-4 flex justify-center items-center'>
                <input type="search" name="q" className="py-2 w-full text-sm text-white bg-transparent pl-10 focus:outline-none focus:text-gray-900 rounded-3xl placeholder:text-white shadow-[0px_0px_6px_0px_#2d3748] " placeholder="Message" autoComplete='off' value={text} onChange={(e) => { setText(e.target.value) }} />
                <div className='px-2'></div>
                <button className='py-2 text-sm text-white bg-transparent px-12 focus:outline-none focus:text-gray-900 rounded-3xl shadow-[0px_0px_6px_0px_#2d3748]' onClick={handleSend}>Send</button>
            </div>
        </div>
    );
}

export default Message;
