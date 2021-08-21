import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { userSignIn } from '../services/authService'

const storedUser = JSON.parse(localStorage.getItem('user'))

const initialState = {
	status: 'idle',
	isAuthenticated: storedUser ? true : false,
	userData: storedUser || null,
	error: '',
}

export const signIn = createAsyncThunk(
	'user/signIn',
	async ({ username, password }, { rejectWithValue }) => {
		try {
			const result = await userSignIn(username, password)

			// Is this the best place to put this?
			// Or should it go inside authService? Or somewhere else?
			localStorage.setItem('user', JSON.stringify(result))

			return result
		} catch (error) {
			return rejectWithValue(error.message)
		}
	}
)

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		signOut: (state) => {
			localStorage.removeItem('user')

			return {
				status: 'idle',
				isAuthenticated: false,
				userData: null,
				error: '',
			}
		},
	},
	extraReducers: (builder) => {
		builder
			// Sign in
			.addCase(signIn.pending, (state) => {
				state.status = 'loading'
				state.error = ''
			})
			.addCase(signIn.fulfilled, (state, action) => {
				state.status = 'idle'
				state.isAuthenticated = true
				state.userData = action.payload
				state.error = ''
			})
			.addCase(signIn.rejected, (state, action) => {
				state.status = 'rejected'
				state.isAuthenticated = false
				state.userData = null
				state.error = action.payload
			})
	},
})

export const { signOut } = userSlice.actions

export default userSlice.reducer
