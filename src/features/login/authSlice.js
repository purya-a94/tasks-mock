import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { login } from '../../services/authService'

const initialState = {
	status: 'idle',
	isAuthenticated: false,
	user: null,
}

export const userLogin = createAsyncThunk(
	'auth/login',
	async ({ username, password }) => {
		const response = await login(username, password)

		// The value we return becomes the `fulfilled` action payload
		// return response.data
	}
)

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(userLogin.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(userLogin.fulfilled, (state, action) => {
				state.status = 'idle'
				state.isAuthenticated = true
				state.user = action.payload
			})
			.addCase(userLogin.rejected, (state) => {
				state.status = 'rejected'
				state.isAuthenticated = false
				state.user = null
			})
	},
})

// export const {} = authSlice.actions

export default authSlice.reducer
