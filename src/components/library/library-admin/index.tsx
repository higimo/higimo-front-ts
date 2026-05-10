import { FunctionComponent } from 'preact'
import { HigimoServerResponse } from 'api-types/server-response.types'
import { LibraryType } from 'api-types/library.types.'

import { useCallback, useState } from 'preact/hooks'
import { useForm } from 'react-hook-form'

import sendRequest, { ApiError, SendRequestOptions } from 'utils/send-request'
import { getAuthPair } from 'utils/get-auth-pair'
import { toast } from 'toast'

import { API_ROUTE } from 'dic/API_ROUTE'

import './style.css'

type FormValues = {
	author: LibraryType['author']
	name: LibraryType['name']
	addon: LibraryType['addon']
	isbn: LibraryType['isbn']
	img: LibraryType['img']
	anons: LibraryType['anons']
}

type HandleLibSubmitType = (addStatus: (val: HigimoServerResponse) => void) =>
	(values: FormValues) => Promise<void>
const handleLibSubmit: HandleLibSubmitType = setStatus => async values => {
	const { login, pass } = getAuthPair()
	try {
		const requestOptions: SendRequestOptions = { method: 'POST', auth: { login, pass }, values }
		const serverResult = await sendRequest(API_ROUTE.lib, requestOptions)
		setStatus(serverResult)
	} catch (error) {
		const apiError = error as ApiError
		toast.error(apiError.message || 'Не получилось добавить пинарик')
	}
}

export const LibraryAdmin: FunctionComponent = () => {
	const [ status, setStatus ] = useState<HigimoServerResponse>()
	const { register, handleSubmit, reset } = useForm<FormValues>()

	const handleReset = useCallback(() => {
		reset()
		setStatus(null)
	}, [reset, setStatus])

	return (
		<form
			className="library-admin"
			onSubmit={handleSubmit(handleLibSubmit(setStatus))}
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
