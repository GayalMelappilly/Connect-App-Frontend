import { useContext, useEffect } from "react"
import { SocketContext } from "../contexts/SocketContext"
import { MessageContext } from "../contexts/MessageContext"

const useListenMessages = () => {
    const { socket } = useContext(SocketContext)
    const { messageInfo, setMessageInfo } = useContext(MessageContext)

    useEffect(() => {
        console.log("Trying to set up socket event listener...");
        try {
            socket?.on("newMessage", (newMessage) => {
                console.log("REACHED SOCKET CONTEXT");
                console.log("NEW MESSAGE : ", newMessage);
                console.log("MESSAGE INFO : ", messageInfo);
                const updatedMessages = [...messageInfo?.messages, newMessage];
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
    
        // Cleanup function to remove the event listener when component unmounts
        return () => {
            console.log("Removing socket event listener...");
            socket?.off("newMessage");
            console.log("Socket event listener removed.");
        };
    }, [socket, setMessageInfo, messageInfo]);

    useEffect(()=>{
        // console.log("MESSAGE INFO IN HOOKS : ", messageInfo)
    },[messageInfo])
}

export default useListenMessages
