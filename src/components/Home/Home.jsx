import React, { useEffect, useState } from 'react'
import './Home.css'
import Contacts from '../Contacts/Contacts';
import Message from '../Message/Message';
import Sidebar from '../Sidebar/Sidebar';

function Home() {

    const [user, setUser] = useState({})

    useEffect(() => {
        console.log("COOKIE: ", document.cookie);
    }, []);

    return (
        <div id='chat' className="flex h-screen bg-cover bg-center w-full items-center justify-center px-32 py-10   max-md:px-24">
            <div className="w-full h-5/6 overflow-hidden rounded-lg backdrop-blur-sm md:flex max-md:backdrop-blur-none max-md:h-full">
                <Contacts />
                <Message />
                <Sidebar />
            </div>
        </div>
    )
}

export default Home