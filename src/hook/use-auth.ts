import { useEffect, useCallback, useContext, useState } from 'preact/hooks'
import { useLocation } from 'preact-iso'

import sendRequest from 'utils/send-request'
import { AuthContext } from 'context/auth'

import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'
import { API_ROUTE } from 'dic/api-route'

export const AUTH_STATUS_DIC = {
	IDLE: 'idle',
	LOADING: 'loading',
	AUTHENTICATED: 'authenticated',
	UNAUTHENTICATED: 'unauthenticated',
} as const

type AuthStatus = typeof AUTH_STATUS_DIC[keyof typeof AUTH_STATUS_DIC]

/**
 * Замыкание, чтобы кешировать запрос
 */
let authState: {
	status: AuthStatus
	isAuth: boolean
} = {
	status: 'idle',
	isAuth: false,
}

type UseAuthType = () => {
	isAuth: boolean
	isAuthLoading: boolean
	redirectToLogin: () => void
	routeTo: (url: string, replace?: boolean) => void
}
export const useAuth: UseAuthType = () => {
	const { route, path } = useLocation()

	const redirectToLogin = useCallback(() => {
		route(`${ROUTE_LINKS.login}?backpath=${path}`, true)
	}, [path])

	const { isAuth, setIsAuth } = useContext(AuthContext)
	// только для обновления состояния наружу
	const [ _, setStatusLoading ] = useState<AuthStatus>(authState.status)

	useEffect(() => {
		if (authState.status === AUTH_STATUS_DIC.IDLE) {
			authState.status = AUTH_STATUS_DIC.LOADING
			setStatusLoading(authState.status)

			sendRequest(API_ROUTE.authMe)
				.then(() => {
					authState.isAuth = true
					authState.status = AUTH_STATUS_DIC.AUTHENTICATED

					setIsAuth(authState.isAuth)
					setStatusLoading(authState.status)
				})
				.catch(() => {
					authState.isAuth = false
					authState.status = AUTH_STATUS_DIC.UNAUTHENTICATED

					setIsAuth(authState.isAuth)
					setStatusLoading(authState.status)
				})
		} else {
			setIsAuth(authState.isAuth)
			setStatusLoading(authState.status)
		}
	}, [authState.status, setIsAuth, setStatusLoading])

	return {
		isAuth,
		isAuthLoading: [
			AUTH_STATUS_DIC.AUTHENTICATED,
			AUTH_STATUS_DIC.UNAUTHENTICATED
		].includes(authState.status as any),
		redirectToLogin,
		routeTo: route,
	}
}
