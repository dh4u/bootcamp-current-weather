import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

require ("dotenv").config();
//console.log("process.env");
//console.log(process.env);

//console.log("process.env.REACT_APP_OPEN_WEATHER_API_KEY: " + process.env.REACT_APP_OPEN_WEATHER_API_KEY);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
