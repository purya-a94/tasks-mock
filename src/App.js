import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'

import './App.css'
import Header from './layouts/Header'
import AuthWrapper from './layouts/AuthWrapper'
import Login from './features/login/Login'
import Tasks from './features/tasks/Tasks'
import Profile from './features/profile/Profile'

import Col from 'react-bootstrap/Col'

function App() {
	const isUserAuthenticated = useSelector(
		(state) => state.user.isAuthenticated
	)

	return (
		<Router>
			<Header />
			<Col sm={12} className="pt-3">
				<Switch>
					<Route exact path="/login" component={Login} />

					<AuthWrapper isAuthenticated={isUserAuthenticated}>
						<Route exact path={['/', '/tasks']} component={Tasks} />
						<Route exact path={'/profile'} component={Profile} />
					</AuthWrapper>
				</Switch>
			</Col>
		</Router>
	)
}

export default App
