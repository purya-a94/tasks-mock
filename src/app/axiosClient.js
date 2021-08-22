import axios from 'axios'

const axiosClient = axios.create()

axiosClient.defaults.baseURL = 'http://192.168.1.140:5000/api'

axiosClient.defaults.headers = {
	'Content-Type': 'application/json',
}

axiosClient.interceptors.request.use((config) => {
	const user = JSON.parse(localStorage.getItem('user'))

	if (user && user.accessToken)
		config.headers.Authorization = `Bearer ${user.accessToken}`

	return config
}, null)

// axiosClient.defaults.withCredentials = false

export default axiosClient
