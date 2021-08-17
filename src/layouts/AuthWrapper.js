import React from 'react'
import { Redirect } from 'react-router-dom'

function AuthWrapper({ children, isAuthenticated }) {
	return isAuthenticated ? children : <Redirect to="/login" />
}

export default AuthWrapper
