import React from 'react'
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom'
import { useSelector } from 'react-redux'

import './App.css'
import Header from './layouts/Header'

function App() {
	return (
		<Router>
			<Header />
		</Router>
	)
}

export default App
