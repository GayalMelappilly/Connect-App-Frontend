import React, { useContext, useEffect, useState } from 'react'
import { UserInfoContext } from '../../contexts/UserInfoContext'

const SenderChat = (props) => {

    console.log("TIME : ",props.currentTime)

    return (
        <div className="chat chat-end">
            <div className="chat-header">
                <p className="text-xs text-white">{props.currentTime}</p>
            </div>
            <div className="chat-bubble bg-emerald-600 text-white">{props.message}</div>
        </div>
    )
}

export default SenderChat
