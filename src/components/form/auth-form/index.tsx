import { FunctionComponent } from 'preact'

import cookies from 'js-cookie'

import { useForm } from 'react-hook-form'
import { useLocation, useRoute } from 'preact-iso'
import { useAuth } from '../../../hook/use-auth'

import sendRequest, { SendRequestOptions } from '../../../utils/send-request'

import { ROUTE_LINKS } from '../../../dic/ROUTE_LINKS'

import './style.css'

type FormValues = {
	login: string
	pass: string
}

const onSubmit = route => data => {
	const { login, pass } = data

	const requestOptions: SendRequestOptions = { method: 'POST', auth: { login, pass } }
	const searchParams = new URLSearchParams(location.search)
	const backpath = searchParams.get('backpath')

	sendRequest('/api/v1/auth/login', requestOptions)
		.then(isAuthorized => {
			if (isAuthorized) {
				cookies.set('name', login)
				cookies.set('pass', pass)
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
			<label>Логин</label>
			<input {...register('login')} name="login" />
			<label>Пароль</label>
			<input {...register('pass')} name="pass" type="password" />
			<div className="form__button">
				<button type="submit" className="default-form__submit">Enter</button>
			</div>
		</form>
	)
}
