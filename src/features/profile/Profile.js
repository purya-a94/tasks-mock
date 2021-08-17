import React from 'react'
import { useSelector } from 'react-redux'

function Profile() {
	const user = useSelector((state) => state.user.userData)

	return (
		<div className="col-sm-6 mx-auto mt-5">
			<p>
				<strong>ID: </strong>
				{user.id}
			</p>
			<p>
				<strong>Username: </strong>
				{user.username}
			</p>
			<p>
				<strong>Register Date: </strong>
				{user.signOnDate}
			</p>
			<p>
				<strong>Access Token: </strong>
				{user.accessToken.substring(0, 20) + ' . . .'}
			</p>
		</div>
	)
}

export default Profile
