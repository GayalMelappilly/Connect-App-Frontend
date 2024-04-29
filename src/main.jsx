import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { StatusContextProvider } from './contexts/AuthContext.jsx';
import { UserInfoContextProvider } from './contexts/UserInfoContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StatusContextProvider>
      <UserInfoContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </UserInfoContextProvider>
    </StatusContextProvider>
  </React.StrictMode>
);