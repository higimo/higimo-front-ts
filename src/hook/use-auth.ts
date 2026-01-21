import
{ useEffect, useCallback, useContext, useState } from 'preact/hooks'
import { useLocation } from 'preact-iso'

import { getAuthPair } from 'utils/get-auth-pair'

import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'
import sendRequest from 'utils/send-request'
import { AuthContext } from 'context/auth'

const isAuthorizedFunc = async () => {
	const { login, pass } = getAuthPair()
	let result = false
	if (!!login && !!pass) {
		result = await sendRequest('/api/v1/auth/login', { method: 'POST', auth: { login, pass } })
	}
	return result
}

export const AUTH_STATUS_DIC = {
	IDLE: 'idle',
	LOADING: 'loading',
	AUTHENTICATED: 'authenticated',
	UNAUTHENTICATED: 'unauthenticated',
}

type AuthStatus = typeof AUTH_STATUS_DIC[keyof typeof AUTH_STATUS_DIC]

let authState: {
	status: AuthStatus
	isAuth: boolean
} = {
	status: 'idle',
	isAuth: false,
}
export const useAuth = () => {
	const { route, path } = useLocation()
	const { login, pass } = getAuthPair()
	const redirectToLogin = useCallback(() => {
		route(`${ROUTE_LINKS.login}?backpath=${path}`, true)
	}, [path])
	const { isAuth, setIsAuth } = useContext(AuthContext)
	const [ statusLoading, setStatusLoading ] = useState<AuthStatus>(authState.status)


	useEffect(() => {
		if (authState.status === 'idle') {
			authState.status = 'loading'
			setStatusLoading('loading')

			isAuthorizedFunc().then((isAuth) => {
				authState.status = isAuth ? 'authenticated' : 'unauthenticated'
				authState.isAuth = isAuth
				setIsAuth(isAuth)
				setStatusLoading(authState.status)
			})
		} else {
			setIsAuth(authState.isAuth)
			setStatusLoading(authState.status)
		}
	}, [setIsAuth, setStatusLoading])

	return {
		login,
		pass,
		isAuth,
		statusLoading,
		redirectToLogin,
		routeTo: route,
	}
}
