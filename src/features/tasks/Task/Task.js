import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { MdEdit, MdDeleteForever } from 'react-icons/md'

import styles from './Task.module.css'

function Task({ details, editHandler, removeHandler }) {
	const [isEditing, setIsEditing] = useState(false)

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset: resetForm,
	} = useForm()

	const typeToColorMap = {
		normal: 'rgba(30, 136, 229, 0.8)',
		urgent: 'rgba(142, 36, 170, 0.8)',
		completed: 'rgba(104, 159, 56, 0.8)',
	}

	const discardHandler = () => {
		setIsEditing(!isEditing)
		resetForm()
	}

	const submitEdit = (formValues) => {
		editHandler(details.id, formValues)

		setIsEditing(false)
	}

	const viewTemplate = (
		<div className={`${styles.task} shadow-sm`}>
			<div className={styles.task_header}>
				<label>{details.title}</label>

				<div className="d-flex align-items-center">
					<button
						onClick={(e) => setIsEditing(!isEditing)}
						className={`btn py-1 px-2 ${styles.task_btn_edit}`}
					>
						<MdEdit fontSize="1.6rem" />
					</button>
					<button
						onClick={(e) => removeHandler(details.id)}
						className={`btn py-1 px-2 ${styles.task_btn_red}`}
					>
						<MdDeleteForever fontSize="1.6rem" />
					</button>
				</div>
			</div>

			<div className={styles.task_body}>
				<p>{details.description}</p>
				<label
					style={{
						backgroundColor:
							typeToColorMap[details.type.toLowerCase()],
					}}
				>
					{details.type}
				</label>
			</div>
		</div>
	)

	const editTemplate = (
		<div className={`${styles.task} shadow`}>
			<form onSubmit={handleSubmit(submitEdit)}>
				<div className={`row ${styles.task_header}`}>
					{/* Title */}
					<div className="col-12 col-sm-7 col-md-8">
						<input
							type="text"
							{...register('title', {
								required: {
									value: true,
									message: 'Title is required.',
								},
								minLength: {
									value: 3,
									message: 'Enter at least 3 characters.',
								},
								maxLength: {
									value: 100,
									message:
										"Can't be more than 100 characters.",
								},
							})}
							defaultValue={details.title}
							placeholder="Title"
							className="form-control"
						/>

						{errors.title && (
							<span className="form-text text-danger">
								{errors.title.message}
							</span>
						)}
					</div>

					{/* Form buttons */}
					<div className="col d-flex justify-content-end align-items-center">
						<button
							type="submit"
							className={`btn py-1 px-2 ${styles.task_btn_confirm}`}
						>
							Update
						</button>
						<button
							type="button"
							onClick={discardHandler}
							className={`btn py-1 px-1`}
						>
							Discard
						</button>
					</div>
				</div>
				<div className={`row ${styles.task_body}`}>
					{/* Description */}
					<div className="col-12 col-md-8">
						<input
							type="text"
							{...register('description')}
							defaultValue={details.description}
							placeholder="Description"
							className="form-control"
						/>

						{errors.description && (
							<span className="form-text text-danger">
								{errors.description.message}
							</span>
						)}
					</div>

					{/* Type */}
					<div className="col">
						<input
							type="text"
							{...register('type', {
								required: {
									value: true,
									message: 'Type is required.',
								},
								minLength: {
									value: 3,
									message: 'Enter at least 3 characters.',
								},
								maxLength: {
									value: 20,
									message:
										"Can't be more than 20 characters.",
								},
							})}
							defaultValue={details.type}
							placeholder="Type"
							className="form-control"
						/>

						{errors.type && (
							<span className="form-text text-danger">
								{errors.type.message}
							</span>
						)}
					</div>
				</div>
			</form>
		</div>
	)

	return !isEditing ? viewTemplate : editTemplate
}

export default Task
