import React, { useContext } from 'react'
import { UserInfoContext } from '../../contexts/UserInfoContext'

const ReceiverChat = () => {

    const { userInfo, setUserInfo } = useContext(UserInfoContext)

    return (
        <div className="items-start gap-2.5">
            <div className="chat chat-start">
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                        <img alt="Tailwind CSS chat bubble component" src={"https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"} />
                    </div>
                </div>
                <div className="chat-header">
                    <time className="text-xs opacity-80 text-white">12:45</time>
                </div>
                <div className="chat-bubble">Receiver message!</div>
                <div className="chat-footer opacity-80 text-white">
                    Delivered
                </div>
            </div>
        </div>
    )
}

export default ReceiverChat