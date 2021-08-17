import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

import { MdEdit, MdDeleteForever } from 'react-icons/md'

import styles from './Tasks.module.css'

function Task() {
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

	const submitForm = (formValues) => {
		// editHandler(details.id, formValues)
	}

	const viewTemplate = (
		<div className={`${styles.task} shadow-sm`}>
			<div className={styles.task_header}>
				{/* <label>{details.title}</label> */}

				<div className="d-flex align-items-center">
					<button
						onClick={(e) => setIsEditing(!isEditing)}
						className={`btn py-1 px-2 ${styles.task_btn_edit}`}
					>
						<MdEdit fontSize="1.6rem" />
					</button>
					<button
						// onClick={(e) => deleteHandler(details.id)}
						className={`btn py-1 px-2 ${styles.task_btn_red}`}
					>
						<MdDeleteForever fontSize="1.6rem" />
					</button>
				</div>
			</div>

			<div className={styles.task_body}>
				{/* <p>{details.description}</p> */}
				<label
				// style={{
				// 	backgroundColor:
				// 		typeToColorMap[details.type.toLowerCase()],
				// }}
				>
					{/* {details.type} */}
				</label>
			</div>
		</div>
	)

	const editTemplate = (
		<div className={`${styles.task} shadow`}>
			<form onSubmit={handleSubmit(submitForm)}>
				<div className={`form-row ${styles.task_header}`}>
					<div className="col-8">
						<input
							type="text"
							{...register('title', {
								required: true,
								minLength: 2,
								maxLength: 100,
							})}
							// defaultValue={details.title}
							placeholder="Title"
							className="form-control"
						/>
					</div>

					<div className="col-auto d-flex align-items-center">
						<button
							type="submit"
							className={`btn py-1 px-2 ${styles.task_btn_confirm}`}
						>
							Update
						</button>
						<button
							type="button"
							onClick={discardHandler}
							className={`btn py-1 px-2`}
						>
							Discard
						</button>
					</div>
				</div>
				<div className={`form-row ${styles.task_body}`}>
					<div className="col-8">
						<input
							type="text"
							{...register('description')}
							// defaultValue={details.description}
							placeholder="Description"
							className="form-control"
						/>
					</div>
					<div className="col-auto">
						<input
							type="text"
							{...register('type', {
								required: true,
								minLength: 2,
								maxLength: 20,
							})}
							// defaultValue={details.type}
							placeholder="Type"
							className="form-control"
						/>
					</div>
				</div>
			</form>
		</div>
	)

	return !isEditing ? viewTemplate : editTemplate
}

export default Task
