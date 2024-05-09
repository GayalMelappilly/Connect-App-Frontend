import React, { useEffect, useState } from 'react'
import getCurrentTime from '../../hooks/getCurrentTime'

const SenderChat = (props) => {

    const [hover, setHover] = useState(false)
    const [index, setIndex] = useState('')

    // console.log("INDEX S : ",props.index)
    useEffect(()=>{
        setIndex(props.index)
    })

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
                        <div className="px-3 py-2 shadow-[0_3px_10px_rgb(0,0,0,0.4)] rounded-b-md rounded-ss-md">
                            <h2 className="text-white text-sm font-normal leading-snug">{props.message}</h2>
                        </div>
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
