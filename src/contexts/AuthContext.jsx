import { createContext, useState } from "react";

export const UserContext = createContext(null)

export const UserContextProvider = ({children}) => {
    const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem("connect-sid")) || null)
    return (
        <UserContext.Provider value={{userInfo, setUserInfo}}>
            {children}
        </UserContext.Provider>
    )
}
