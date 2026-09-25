import { ApiError } from 'errors/higimo-api-error'
import { FunctionComponent } from 'preact'
import { LibraryType } from 'api-types/library.types'

import { useForm } from 'react-hook-form'

import { libApi } from 'repositories/lib-api.repository'
import { toast } from 'toast'

import './style.css'

type FormValues = Omit<LibraryType, 'id'>

const handleLibSubmit = async (values: FormValues) => {
	try {
		const book = await libApi.create(values)
		if (!book) {

		}
	} catch (error) {
		const apiError = error as ApiError
		toast.error(apiError.message || 'Не получилось добавить пинарик')
	}
}

export const LibraryAdmin: FunctionComponent = () => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { isSubmitting, isDirty },
	} = useForm<FormValues>()

	return (
		<form
			className="library-admin"
			onSubmit={handleSubmit(handleLibSubmit)}
			autocomplete="off"
		>
			{/* TODO: [MEDIUM] генерировать форму */}
			<div className="library-admin__row">
				<div className="library-admin__label">Автор</div>
				<div className="library-admin__input">
					<input {...register('author')} name="author" />
				</div>
			</div>
			<div className="library-admin__row">
				<div className="library-admin__label">Название</div>
				<div className="library-admin__input">
					<input {...register('name')} name="name" />
				</div>
			</div>
			<div className="library-admin__row">
				<div className="library-admin__label">Допназвание</div>
				<div className="library-admin__input">
					<input {...register('addon')} name="addon" />
				</div>
			</div>
			<div className="library-admin__row">
				<div className="library-admin__label">ISBN</div>
				<div className="library-admin__input">
					<input {...register('isbn')} name="isbn" />
				</div>
			</div>
			<div className="library-admin__row">
				<div className="library-admin__label">Картинка</div>
				<div className="library-admin__input">
					<input {...register('img')} name="img" />
				</div>
				<p>
					Прям ссылку на файл
				</p>
			</div>
			<div className="library-admin__row">
				<div className="library-admin__label">Описание</div>
				<div className="library-admin__input">
					<textarea {...register('anons')} name="anons" />
				</div>
			</div>
			<div className="library-admin__row">
				<button type="submit" className="library-admin__button" disabled={isSubmitting}>
					{isSubmitting ? 'Добавление…' : 'Добавить'}
				</button>
			</div>
			{isDirty && (
				<button
					className="library-admin__button"
					onClick={() => reset()}
				>
					Сбросить
				</button>
			)}
		</form>
	)
}
