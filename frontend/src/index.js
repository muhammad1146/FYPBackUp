import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.js';
import  './bootstrap.min.css'
import UserProvider from './Contexts/UserContext';

ReactDOM.render(
  <React.StrictMode>
  <UserProvider>
    <App />
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);