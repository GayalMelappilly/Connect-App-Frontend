import { useState, useEffect, useContext, createContext } from 'react';
import { StatusContext } from './AuthContext';
import { UserInfoContext } from './UserInfoContext';
import io from "socket.io-client";

export const SocketContext = createContext(null)

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])
    const { status } = useContext(StatusContext)
    const { userInfo } = useContext(UserInfoContext)

    useEffect(() => {
        console.log("STATUS : ",status)
        if (status) {
            console.log("USERINFO : ", userInfo._id)
            const socket = io('http://localhost:5000', {
                query:{
                    userId: userInfo._id
                }
            })
            setSocket(socket)

            socket.on('getOnlineUsers', (users)=>{
                setOnlineUsers(users)
                console.log("S USERS ", users)
            })

            return () => socket.close()
        } else {
            if (socket) {
                socket.close()
                setSocket(null)
            }
        }
    },[status])

    return (
        <SocketContext.Provider value={{ socket, onlineUsers }}>
            {children}
        </SocketContext.Provider>
    )
}