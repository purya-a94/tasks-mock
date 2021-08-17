import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	list: [],
}

const tasksSlice = createSlice({
	name: 'tasks',
	initialState,
	reducers: {},
})

// export const {  } = tasksSlice.actions
export default tasksSlice.reducer
