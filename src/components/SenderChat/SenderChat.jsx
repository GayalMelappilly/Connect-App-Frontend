import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { MdDelete } from "react-icons/md";

const SenderChat = (props) => {

    const [hover, setHover] = useState(false)
    const [index, setIndex] = useState('')

    // console.log("INDEX S : ",props.index)
    useEffect(()=>{
        setIndex(props.index)
    })

    const handleDeleteMessage = () => {
        console.log("INFO :",props.details)
        axios.put('http://localhost:5000/message/delete-message', {receiverId: props.details.receiverId, senderId: props.details.senderId, messageId: props.details._id}).then((response)=>{
            console.log(response.data)
        })
    }

    return (
        // <div className="chat chat-end">
        //     <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
        //         <div className="bg-emerald-600 text-white">{props.message}</div>
        //         <div className={`${hover ? 'opacity-80' : 'opacity-0 absolute'} transition-all ease-in-out duration-100 chat-header`}>
        //             <p className="text-xs text-white flex">{props.currentTime}</p>
        //         </div>
        //     </div>
        // </div>
        <div className="w-full">
            <div className="flex justify-end">
                <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                    <div className="grid mb-2">
                        <div className="px-3 py-2 shadow-[0_3px_10px_rgb(0,0,0,0.4)] rounded-b-md rounded-ss-md flex">
                            <h2 className="text-white text-sm font-normal leading-snug          max-md:text-xs">{props.message}</h2>
                        </div>
                            <button className={`${hover ? 'opacity-80' : 'opacity-0 absolute'}`} onClick={()=>handleDeleteMessage()}><MdDelete className='fill-red-500' /></button>
                        <div className={`${hover ? 'opacity-80' : 'opacity-0 absolute'}`}>
                            <h3 className="text-gray-500 text-xs font-normal leading-4 py-1">{props.currentTime}</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SenderChat
