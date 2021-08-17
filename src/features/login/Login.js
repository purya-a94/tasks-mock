import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import { signIn } from '../../app/reducers/userSlice'
import { userSignOn } from '../../app/services/authService'

import styles from './Login.module.css'
import Card from 'react-bootstrap/Card'
import Alert from 'react-bootstrap/Alert'

function Login() {
	const user = useSelector((state) => state.user)
	const dispatch = useDispatch()

	const [isRegistration, setIsRegistration] = useState(false)
	const [message, setMessage] = useState({
		status: 'idle',
		message: '',
	})

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm()

	const loginFormHandler = (data) => {
		// Registration
		if (isRegistration) {
			userSignOn(data.username, data.password)
				.then((result) => {
					if (result.success) {
						setMessage({
							status: 'success',
							message: `Done! Your username is ${result.newUser}`,
						})
					} else {
						setMessage({
							status: 'failed',
							message: result.message,
						})
					}
				})
				.catch((error) => {
					setMessage({
						status: 'failed',
						message: error.message,
					})
				})
		}
		// Login
		else {
			dispatch(signIn(data))
		}
	}

	useEffect(() => {
		if (user.error) {
			setMessage({ status: 'failed', message: user.error })
		}
	}, [user])

	if (user.isAuthenticated) {
		return <Redirect to="/" />
	}

	return (
		<div className="col-md-12 pt-5">
			<Card className={styles.login_card}>
				<Card.Img
					variant="top"
					src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
					alt="login-image"
					className={styles.login_card_image}
				/>

				<Card.Body>
					<form onSubmit={handleSubmit(loginFormHandler)}>
						{/* 
							•••••••
							Username
							•••••••
						 */}
						<div className="form-group mt-3">
							<label htmlFor="username">Username</label>
							<input
								type="text"
								{...register('username', {
									required: {
										value: true,
										message: 'Username is required.',
									},
									minLength: {
										value: 3,
										message: 'Enter at least 3 characters.',
									},
								})}
								className="form-control"
							/>
							{errors.username && (
								<span className="text-danger mt-2">
									{errors.username.message}
								</span>
							)}
						</div>

						{/* 
							•••••••
							Password
							•••••••
						 */}
						<div className="form-group mt-3">
							<label htmlFor="password">Password</label>
							<input
								type="password"
								{...register('password', {
									required: {
										value: true,
										message: 'Password is required.',
									},
									minLength: {
										value: 3,
										message: 'Enter at least 3 characters.',
									},
								})}
								className="form-control"
							/>
							{errors.password && (
								<span className="text-danger mt-2">
									{errors.password.message}
								</span>
							)}
						</div>

						{/* 
							•••••••
							Checkbox and Submission
							•••••••
						 */}
						<div className="form-group">
							<div className="form-check mt-3">
								<input
									className="form-check-input"
									type="checkbox"
									value={isRegistration}
									onChange={(e) =>
										setIsRegistration(e.target.checked)
									}
									id="signOnChkbx"
								/>
								<label
									className="form-check-label"
									htmlFor="signOnChkbx"
								>
									I want to register.
								</label>
							</div>
							<button
								type="submit"
								disabled={user.status === 'loading'}
								className="btn btn-primary d-block w-100 mt-3"
							>
								{user.status === 'loading' && (
									<span className="spinner-border spinner-border-sm"></span>
								)}
								<span>
									{isRegistration ? 'Register' : 'Login'}
								</span>
							</button>
						</div>

						{/* 
							•••••••
							Messages
							•••••••
						 */}
						{message.status !== 'idle' ? (
							<div className="mt-3">
								<Alert
									variant={
										message.status === 'success'
											? 'success'
											: 'danger'
									}
								>
									{message.message}
								</Alert>
							</div>
						) : (
							false
						)}
					</form>
				</Card.Body>
			</Card>
		</div>
	)
}

export default Login
