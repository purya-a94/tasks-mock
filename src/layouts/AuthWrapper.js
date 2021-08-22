import React from 'react'
import { Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

function AuthWrapper({ children }) {
	const isUserAuthenticated = useSelector(
		(state) => state.user.isAuthenticated
	)

	return isUserAuthenticated ? children : <Redirect to="/login" />
}

export default AuthWrapper
