import axios from 'axios'

const axiosClient = axios.create()

const user = JSON.parse(localStorage.getItem('user'))

axiosClient.defaults.baseURL = 'http://192.168.1.140:5000/api'

axiosClient.defaults.headers = {
	'Content-Type': 'application/json',
	Authorization:
		user && user.accessToken ? `Bearer ${user.accessToken}` : null,
}

// axiosClient.defaults.withCredentials = false

export default axiosClient
