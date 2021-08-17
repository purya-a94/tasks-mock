import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { signOut } from '../app/reducers/userSlice'
import { NavLink } from 'react-router-dom'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'

function Header() {
	const isUserAuthenticated = useSelector(
		(state) => state.user.isAuthenticated
	)
	const dispatch = useDispatch()

	return (
		<Navbar bg="light" expand="md">
			<Container>
				<Navbar.Brand>Todo Mock</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					{isUserAuthenticated ? (
						<>
							{/* 
								•••••••
								Navbar links
								•••••••
							*/}
							<Nav className="me-auto">
								<Nav.Item>
									<NavLink
										to="/tasks"
										className="nav-link"
										activeStyle={{
											borderBottom: '2px solid #37474F',
										}}
									>
										Tasks
									</NavLink>
								</Nav.Item>
								<Nav.Item>
									<NavLink
										to="/profile"
										className="nav-link"
										activeStyle={{
											borderBottom: '2px solid #37474F',
										}}
									>
										Profile
									</NavLink>
								</Nav.Item>
							</Nav>
							{/* 
								•••••••
								Sign out button
								•••••••
							*/}
							<button
								className="btn btn-light"
								onClick={(e) => dispatch(signOut())}
							>
								Sign Out
							</button>
						</>
					) : (
						false
					)}
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}

export default Header
