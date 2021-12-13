import React from 'react';
import Main from './Components/Main'
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import './index.css';


ReactDOM.render(<BrowserRouter><Main/></BrowserRouter>,document.getElementById('root'));