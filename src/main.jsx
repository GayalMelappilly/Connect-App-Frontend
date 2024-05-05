import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { StatusContextProvider } from './contexts/AuthContext.jsx';
import { UserInfoContextProvider } from './contexts/UserInfoContext.jsx';
import { ContactContextProvider } from './contexts/ContactContext.jsx';
import { MessageContextProvider } from './contexts/MessageContext.jsx';
import { SocketContextProvider } from './contexts/SocketContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StatusContextProvider>
      <UserInfoContextProvider>
        <ContactContextProvider>
          <MessageContextProvider>
            <SocketContextProvider>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </SocketContextProvider>
          </MessageContextProvider>
        </ContactContextProvider>
      </UserInfoContextProvider>
    </StatusContextProvider>
  </React.StrictMode >
);