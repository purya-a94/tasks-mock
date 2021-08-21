import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axiosClient from '../../app/axiosClient'

const initialState = {
	status: 'idle',
	list: [],
	error: '',
	operationMessage: '',
}

export const getTasks = createAsyncThunk(
	'tasks/getTasks',
	async (args, { rejectWithValue }) => {
		try {
			const response = await axiosClient.get('/tasks')

			return response.data.data.tasks
		} catch (error) {
			if (error.response) {
				// The request was made and the server responded with a status code
				// that falls out of the range of 2xx.

				// throw Error(`Server error: status ${error.response.status}`)
				return rejectWithValue(error.response.data.message)
			} else if (error.request) {
				// The request was made but no response was received
				// `error.request` is an instance of XMLHttpRequest
				// in the browser and an instance of
				// http.ClientRequest in node.js.
				return rejectWithValue('No response from server')
			} else {
				// Something happened in setting up the request that triggered an Error.
				return rejectWithValue(`Request error: ${error.message}`)
			}
		}
	}
)

export const addTask = createAsyncThunk(
	'tasks/addTask',
	async ({ title, type, description }, { rejectWithValue }) => {
		try {
			const response = await axiosClient.post('/tasks', {
				title,
				type,
				description,
			})

			return response.data.data.task
		} catch (error) {
			if (error.response) {
				// The request was made and the server responded with a status code
				// that falls out of the range of 2xx.

				// throw Error(`Server error: status ${error.response.status}`)
				return rejectWithValue(error.response.data.message)
			} else if (error.request) {
				// The request was made but no response was received
				// `error.request` is an instance of XMLHttpRequest
				// in the browser and an instance of
				// http.ClientRequest in node.js.
				return rejectWithValue('No response from server')
			} else {
				// Something happened in setting up the request that triggered an Error.
				return rejectWithValue(`Request error: ${error.message}`)
			}
		}
	}
)

export const updateTask = createAsyncThunk(
	'tasks/updateTask',
	async ({ id, title, type, description }, { rejectWithValue }) => {
		try {
			const response = await axiosClient.put(`/tasks/${id}`, {
				title,
				type,
				description,
			})

			// Since the API is not returning a standard response containing only the
			// updated resource, we have to find the element that was updated.
			return response.data.data.tasks.find((item) => item.id === id)
		} catch (error) {
			if (error.response) {
				// The request was made and the server responded with a status code
				// that falls out of the range of 2xx.

				// throw Error(`Server error: status ${error.response.status}`)
				return rejectWithValue(error.response.data.message)
			} else if (error.request) {
				// The request was made but no response was received
				// `error.request` is an instance of XMLHttpRequest
				// in the browser and an instance of
				// http.ClientRequest in node.js.
				return rejectWithValue('No response from server')
			} else {
				// Something happened in setting up the request that triggered an Error.
				return rejectWithValue(`Request error: ${error.message}`)
			}
		}
	}
)

export const deleteTask = createAsyncThunk(
	'tasks/deleteTask',
	async (id, { rejectWithValue }) => {
		try {
			await axiosClient.delete(`/tasks/${id}`)

			return id
		} catch (error) {
			if (error.response) {
				// The request was made and the server responded with a status code
				// that falls out of the range of 2xx.

				// throw Error(`Server error: status ${error.response.status}`)
				return rejectWithValue(error.response.data.message)
			} else if (error.request) {
				// The request was made but no response was received
				// `error.request` is an instance of XMLHttpRequest
				// in the browser and an instance of
				// http.ClientRequest in node.js.
				return rejectWithValue('No response from server')
			} else {
				// Something happened in setting up the request that triggered an Error.
				return rejectWithValue(`Request error: ${error.message}`)
			}
		}
	}
)

const tasksSlice = createSlice({
	name: 'tasks',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			// Get
			.addCase(getTasks.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(getTasks.fulfilled, (state, action) => {
				state.status = 'fulfilled'
				state.list = action.payload
				state.error = ''
			})
			.addCase(getTasks.rejected, (state, action) => {
				state.status = 'rejected'
				state.list = []
				state.error = action.payload
			})
			// Add
			.addCase(addTask.fulfilled, (state, action) => {
				state.list.push(action.payload)
				state.operationMessage = 'Task was successfully added.'
			})
			.addCase(addTask.rejected, (state, action) => {
				state.operationMessage = `Failed to add task. Try again later.\nError: ${action.payload}`
			})
			// Update
			.addCase(updateTask.fulfilled, (state, action) => {
				state.list[
					state.list.findIndex((el) => el.id === action.payload.id)
				] = action.payload

				state.operationMessage = 'Task was successfully updated.'
			})
			.addCase(updateTask.rejected, (state, action) => {
				state.operationMessage = `Failed to update Task. Try again later.\nError: ${action.payload}`
			})
			// Delete
			.addCase(deleteTask.fulfilled, (state, action) => {
				// action payload is the deleted task's id.
				state.list.splice(
					state.list.findIndex((el) => el.id === action.payload),
					1
				)

				state.operationMessage = 'Task removed.'
			})
			.addCase(deleteTask.rejected, (state, action) => {
				state.operationMessage = `Could not remove task. Try again later.\nError: ${action.payload}`
			})
	},
})

// export const {  } = tasksSlice.actions

export default tasksSlice.reducer
