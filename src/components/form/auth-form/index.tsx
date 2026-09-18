import { ApiError } from 'utils/api/send-request'
import { FunctionComponent } from 'preact'

import { useForm } from 'react-hook-form'

import { getBackPath } from 'utils/get-back-path'
import { isValidAuth } from 'utils/is-valid-auth'
import { sendRequest } from 'utils/api/send-request'
import { toast } from 'toast'

import { API_ROUTE } from 'dic/API_ROUTE'

import './style.css'

type FormValues = {
	email: string
	pass: string
}

const handleLogin = async (data: FormValues) => {
	const { email, pass } = data

	try {
		const { data: authData } = await sendRequest(API_ROUTE.login, {
			method: 'POST',
			values: { email, pass }
		})

		if (!isValidAuth(authData)) {
			return toast.error('Неверный формат ответа сервера')
		}

		window.location.href = getBackPath()
	} catch (error) {
		const apiError = error as ApiError
		toast.error(apiError.message || 'Ошибка при входе в систему')
	}
}

// TODO: [HARD] пора сделать компоненты формы?
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
