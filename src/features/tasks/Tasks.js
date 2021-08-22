import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
// import useFetch from '../../app/hooks/useFetch'
import { useForm } from 'react-hook-form'

import { getTasks, addTask, updateTask, deleteTask } from './tasksSlice'
import Task from './Task/Task'

import styles from './Tasks.module.css'
import Loader from 'react-loader-spinner'
import Swal from 'sweetalert2'

function Tasks() {
	const tasks = useSelector((state) => state.tasks)
	const dispatch = useDispatch()

	// Custom hook alternative
	// const { status, data, error } = useFetch('/tasks')

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitSuccessful },
		reset: resetForm,
	} = useForm()

	// Initial tasks load
	useEffect(() => {
		dispatch(getTasks())
	}, [dispatch])

	// Reset task creation form
	useEffect(() => {
		if (isSubmitSuccessful) {
			resetForm()
		}
	}, [isSubmitSuccessful, resetForm])

	// Show user's operation result as toasts
	useEffect(() => {
		if (tasks.operationLog.id !== -1) {
			Swal.fire({
				position: 'bottom-right',
				toast: true,
				icon:
					tasks.operationLog.type === 'success' ? 'success' : 'error',
				title: tasks.operationLog.message,
				showConfirmButton: false,
				showCloseButton: true,
				timer: 1500,
				timerProgressBar: true,
			})
		}
	}, [tasks.operationLog])

	const createTask = ({ title, type, description }) => {
		// This duplicity is only for clarification.
		const createArgs = {
			title,
			type,
			description,
		}

		dispatch(addTask(createArgs))
	}

	const editTask = (id, { title, type, description }) => {
		// This duplicity is only for clarification.
		const updateArgs = {
			id,
			title,
			type,
			description,
		}

		dispatch(updateTask(updateArgs))
	}

	const removeTask = (id) => {
		dispatch(deleteTask(id))
	}

	return (
		<div className={`col-10 col-md-8 col-lg-6 mx-auto ${styles.tasks}`}>
			{/* Create Task Form */}
			<div className={`${styles.tasks_form_wrapper} shadow-sm`}>
				<h4 className="text-center">Create a New Task</h4>

				<form onSubmit={handleSubmit(createTask)} className="mt-4">
					<div className="row gy-3">
						{/* Title */}
						<div className="col-12 col-md-8">
							<div className="form-floating">
								<input
									type="text"
									{...register('title', {
										required: {
											value: true,
											message: 'Title is required.',
										},
										minLength: {
											value: 3,
											message:
												'Enter at least 3 characters.',
										},
										maxLength: {
											value: 100,
											message:
												"Can't be more than 100 characters.",
										},
									})}
									defaultValue=""
									className="form-control"
									placeholder="Task title..."
								/>
								<label htmlFor="title">Title</label>
							</div>

							{errors.title && (
								<span className="form-text text-danger">
									{errors.title.message}
								</span>
							)}
						</div>
						{/* Type */}
						<div className="col">
							<div className="form-floating">
								<input
									type="text"
									{...register('type', {
										required: {
											value: true,
											message: 'Type is required.',
										},
										minLength: {
											value: 3,
											message:
												'Enter at least 3 characters.',
										},
										maxLength: {
											value: 20,
											message:
												"Can't be more than 20 characters.",
										},
									})}
									defaultValue=""
									className="form-control"
									placeholder="Task type..."
								/>
								<label htmlFor="type">Type</label>
							</div>

							{errors.type && (
								<span className="form-text text-danger">
									{errors.type.message}
								</span>
							)}
						</div>
					</div>

					{/* Description */}
					<div className="row mt-3">
						<div className="col">
							<div className="form-floating">
								<input
									type="text"
									{...register('description')}
									defaultValue=""
									className="form-control"
									placeholder="Describe your task..."
								/>
								<label
									className="col-form-label"
									htmlFor="description"
								>
									Description
								</label>
							</div>
						</div>
					</div>

					{/* Submit button */}
					<div className="row mt-3 justify-content-end">
						<div className="col-4 col-md-3">
							<button
								type="submit"
								className="btn btn-primary w-100"
							>
								Add
							</button>
						</div>
					</div>
				</form>
			</div>

			{/* Tasks List */}
			<div className="mt-4">
				{tasks.status === 'loading' ? (
					/*
						•••••
						Loading view
						•••••
					*/
					<Loader
						type="BallTriangle"
						color="#00695C"
						height={40}
						width={40}
						className="text-center"
					/>
				) : tasks.status === 'rejected' ? (
					/*
						•••••
						Error view
						•••••
					*/
					<h5>{tasks.error}</h5>
				) : tasks.list.length ? (
					/*
						•••••
						Main content
						•••••
					*/
					tasks.list.map((task) => {
						return (
							<Task
								key={task.id}
								details={task}
								editHandler={editTask}
								removeHandler={removeTask}
							/>
						)
					})
				) : (
					/*
						•••••
						No content view
						•••••
					*/
					<h5>
						No tasks available. You can start by creating a new one.
					</h5>
				)}
			</div>
		</div>
	)
}

export default Tasks
