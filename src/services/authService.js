import axiosClient from '../app/axiosClient'

const setUserDataToStorage = (userData) => {
	localStorage.setItem('user', JSON.stringify(userData))
}

export const login = async (username, password) => {
	try {
		// const response = await axiosClient.get('/login')

		// return response.data
	} catch (error) {
		if (error.response) {
			// The request was made and the server responded with a status code
			// that falls out of the range of 2xx.
			throw Error(`Server error: status ${error.response.status}`)
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
