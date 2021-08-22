import React from 'react'
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom'

import './App.css'
import Header from './layouts/Header'
import AuthWrapper from './layouts/AuthWrapper'
import Login from './features/login/Login'
import Tasks from './features/tasks/Tasks'
import Profile from './features/profile/Profile'

import Col from 'react-bootstrap/Col'

function App() {
	return (
		<Router>
			<Header />
			<Col sm={12} className="pt-3">
				<Switch>
					<Route exact path="/login" component={Login} />

					<AuthWrapper>
						<Route
							exact
							path={'/'}
							render={() => <Redirect to="/tasks" />}
						/>
						<Route exact path={'/tasks'}>
							<Tasks />
						</Route>
						<Route exact path={'/profile'}>
							<Profile />
						</Route>
					</AuthWrapper>
				</Switch>
			</Col>
		</Router>
	)
}

export default App
