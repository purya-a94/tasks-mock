import axiosClient from '../axiosClient'

// const setUserDataToStorage = (userData) => {
// 	localStorage.setItem('user', JSON.stringify(userData))
// }

const userSignOn = async (username, password) => {
	try {
		const response = await axiosClient.post('/auth/register', {
			username,
			password,
		})

		if (response.status === 201 && response.data.success) {
			return {
				success: true,
				newUser: response.data.data.user.username,
			}
		} else {
			throw Error(response.data.message)
		}
		// return response.data
	} catch (error) {
		if (error.response) {
			// The request was made and the server responded with a status code
			// that falls out of the range of 2xx.

			// throw Error(`Server error: status ${error.response.status}`)
			throw Error(error.response.data.message)
		} else if (error.request) {
			// The request was made but no response was received
			// `error.request` is an instance of XMLHttpRequest
			// in the browser and an instance of
			// http.ClientRequest in node.js.
			throw Error(`No response from server`)
		} else {
			// Something happened in setting up the request that triggered an Error.
			throw Error(`Request error: ${error.message}`)
		}
	}
}

const userSignIn = async (username, password) => {
	try {
		const response = await axiosClient.post('/auth/login', {
			username,
			password,
		})

		if (response.status === 200 && response.data.success) {
			const userData = {
				id: response.data.data.user.id,
				username: response.data.data.user.username,
				signOnDate: response.data.data.user.created_at,
				accessToken: response.data.data.token,
			}

			// setUserDataToStorage(userData)

			return userData
		} else {
			throw Error(response.data.message)
		}
		// return response.data
	} catch (error) {
		if (error.response) {
			// The request was made and the server responded with a status code
			// that falls out of the range of 2xx.

			// throw Error(`Server error: status ${error.response.status}`)
			throw Error(error.response.data.message)
		} else if (error.request) {
			// The request was made but no response was received
			// `error.request` is an instance of XMLHttpRequest
			// in the browser and an instance of
			// http.ClientRequest in node.js.
			throw Error(`No response from server`)
		} else {
			// Something happened in setting up the request that triggered an Error.
			throw Error(`Request error: ${error.message}`)
		}
	}
}

export { userSignOn, userSignIn }
