import { useState, useEffect } from 'react'
import axiosClient from '../axiosClient'

function useFetch(fetchUrl) {
	const initialState = {
		status: 'pending',
		data: null,
		error: '',
	}

	const [result, setResult] = useState(initialState)

	const requestData = async (url) => {
		try {
			const response = await axiosClient.get(url)

			return response.data
		} catch (error) {
			if (error.response) {
				// The request was made and the server responded with a status code
				// that falls out of the range of 2xx.

				// throw `Server error: status ${error.response.status}`
				throw Error(error.response.data.message)
			} else if (error.request) {
				// The request was made but no response was received
				// `error.request` is an instance of XMLHttpRequest
				// in the browser and an instance of
				// http.ClientRequest in node.js.
				throw Error('No response from server.')
			} else {
				// Something happened in setting up the request that triggered an Error.
				throw Error(`Request error: ${error.message}`)
			}
		}
	}

	useEffect(() => {
		requestData(fetchUrl)
			.then((res) => {
				setResult({
					status: 'success',
					data: res,
					error: '',
				})
			})
			.catch((err) => {
				setResult({
					status: 'failed',
					data: null,
					error: err.message,
				})
			})
	}, [fetchUrl])

	return result
}

export default useFetch
