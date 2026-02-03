import { FunctionComponent } from 'preact'

import cookies from 'js-cookie'

import { useForm } from 'react-hook-form'
import { useLocation } from 'preact-iso'
import { useAuth } from 'hook/use-auth'

import sendRequest, { SendRequestOptions } from 'utils/send-request'

import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'
import { API_ROUTE } from 'dic/api-route'

import './style.css'

type FormValues = {
	email: string
	pass: string
}

const onSubmit = route => (data: FormValues) => {
	const { email, pass } = data

	const requestOptions: SendRequestOptions = { method: 'POST', values: { email, pass } }
	const searchParams = new URLSearchParams(location.search)
	const backpath = searchParams.get('backpath')

	sendRequest(API_ROUTE.login, requestOptions)
		.then(authData => {
			if (authData.access_token.length && authData.token_type === 'bearer' && authData.user.id > 0) {
				route((backpath || ROUTE_LINKS.adminIndex), true)
			}
		})
}

export const AuthForm: FunctionComponent = () => {
	const { register, handleSubmit } = useForm<FormValues>({})
	const { route } = useLocation()
	const { isAuth } = useAuth()

	if (isAuth) {
		route(ROUTE_LINKS.adminIndex, true)
	}

	return (
		<form className="container" onSubmit={handleSubmit(onSubmit(route))}>
			<label>email</label>
			<input {...register('email')} name="email" />
			<label>Пароль</label>
			<input {...register('pass')} name="pass" type="password" />
			<div className="form__button">
				<button type="submit" className="default-form__submit">Enter</button>
			</div>
		</form>
	)
}
