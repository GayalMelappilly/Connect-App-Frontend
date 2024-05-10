import React, { useContext, useEffect, useState } from 'react'
import { UserInfoContext } from '../../contexts/UserInfoContext'

const ReceiverChat = (props) => {

    const {userInfo} = useContext(UserInfoContext)

    const [hover, setHover] = useState(false)

    return (
        <div className="w-full">
            <div className="grid">
                <div className="flex gap-2.5 mb-4">
                    <div className="grid" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                        <div className="w-max grid">
                            <div className="px-3.5 py-2 bg-emerald-600 rounded-se-md rounded-b-md shadow-[0px_3px_10px_rgb(0,0,0,0.4)]">
                                <h5 className="text-black text-sm font-normal leading-snug          max-md:text-xs">{props.message}</h5>
                            </div>
                            <div className={` ${hover ? 'opacity-80' : 'opacity-0 absolute'}`}>
                                <h6 className="text-gray-500 text-xs font-normal pt-1">{props.currentTime}</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReceiverChat
