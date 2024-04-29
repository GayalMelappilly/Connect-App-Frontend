import React, { useContext } from 'react'
import { UserInfoContext } from '../../contexts/UserInfoContext'

const SenderChat = () => {

    const { userInfo, setUserInfo } = useContext(UserInfoContext)

    return (
        <div className="chat chat-end">
            {/* <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img alt="Tailwind CSS chat bubble component" src={userInfo.image} />
                </div>
            </div> */}
            <div className="chat-header">
                <time className="text-xs text-white">12:46</time>
            </div>
            <div className="chat-bubble">Sender message!</div>
            <div className="chat-footer text-white">
                Seen at 12:46
            </div>
        </div>
    )
}

export default SenderChat
