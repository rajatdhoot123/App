import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import App from './routes'
require('./style.css');

ReactDOM.render(
	<App />, 
	document.getElementById('app')
)