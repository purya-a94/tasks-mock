import userReducer from './reducers/userSlice'
import tasksReducer from '../features/tasks/tasksSlice'

const rootReducer = {
	user: userReducer,
	tasks: tasksReducer,
}

export default rootReducer
