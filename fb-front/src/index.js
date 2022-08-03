import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/js/bootstrap.js'
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap/dist/js/bootstrap.js'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './index.css'
import{Provider} from 'react-redux'
import { createStore } from "redux"
import reducer from './reducerFolder/reducer'
import axios from 'axios';
import { registerLogin } from './reducerFolder/action'; 




ReactDOM.render(
  
  
    <App />
    
    
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

