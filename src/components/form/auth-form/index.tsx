import { FunctionComponent } from 'preact'

import { useForm } from 'react-hook-form'

import sendRequest, { ApiError, SendRequestOptions } from 'utils/api/send-request'

import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'
import { API_ROUTE } from 'dic/API_ROUTE'
import { toast } from 'toast'

import './style.css'

type FormValues = {
	email: string
	pass: string
}

const handleLogin = async (data: FormValues) => {
	const { email, pass } = data

	const requestOptions: SendRequestOptions = { method: 'POST', values: { email, pass } }
	const searchParams = new URLSearchParams(location.search)
	const backpath = searchParams.get('backpath') || ROUTE_LINKS.adminIndex

	try {
		const authData = await sendRequest(API_ROUTE.login, requestOptions)

		const isValid = authData.access_token?.length &&
			authData.token_type === 'bearer' &&
			authData.user?.id > 0

		if (!isValid) {
			return toast.error('Неверный формат ответа сервера')
		}

		window.location.href = backpath
	} catch (error) {
		const apiError = error as ApiError
		toast.error(apiError.message || 'Ошибка при входе в систему')
	}
}

export const AuthForm: FunctionComponent = () => {
	const { register, handleSubmit, formState: { isSubmitting } } = useForm<FormValues>({})

	return (
		<form className="container" onSubmit={handleSubmit(handleLogin)}>
			<label htmlFor="email">email</label>
			<input
				{...register('email')}
				name="email"
				placeholder="example@gmail.com"
				disabled={isSubmitting}
			/>
			<label htmlFor="pass">Пароль</label>
			<input
				{...register('pass')}
				name="pass"
				type="password"
				disabled={isSubmitting}
			/>
			<div className="form__button">
				<button type="submit" className="default-form__submit" disabled={isSubmitting}>
					{isSubmitting ? 'Проникновение…' : 'Войти'}
				</button>
			</div>
		</form>
	)
}
