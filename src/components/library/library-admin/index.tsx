import { FunctionalComponent } from 'preact'

import { useState } from 'preact/hooks'
import { useForm } from 'react-hook-form'

import sendRequest, { SendRequestOptions } from 'utils/send-request'
import { getAuthPair } from 'utils/get-auth-pair'

import './style.css'

const onSubmit = ({ setStatus }) => values => {
	const { login, pass } = getAuthPair()
	const requestOptions: SendRequestOptions = { method: 'POST', auth: { login, pass }, values }
	sendRequest('/api/v1/lib', requestOptions)
		.then(res => setStatus(res))
}

type FormValues = {
	author: string;
	name: string;
	addon: string;
	isbn: string;
	img: string;
	anons: string;
}

// TODO добавить комбобокс
export const LibraryAdmin: FunctionalComponent = () => {
	const [ status, setStatus ] = useState()
	const { register, handleSubmit, reset } = useForm<FormValues>()

	const handleReset = () => {
		reset()
		setStatus(null)
	}

	return (
		<form
			className="library-admin"
			onSubmit={handleSubmit(onSubmit({ setStatus }))}
			autocomplete="off"
		>
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
				<button class="library-admin__button">Сохранить</button>
				<p>Пока не сохраняет, надо пофиксить</p>
			</div>
			{!!status && (
				<div className="library-admin__row">
					<p>
						{status}
					</p>
					<button class="library-admin__button" onClick={handleReset}>Сбросить</button>
				</div>
			)}
		</form>
	)
}
