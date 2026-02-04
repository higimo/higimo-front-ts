import { useEffect, useCallback, useReducer } from 'preact/hooks'
import { useLocation } from 'preact-iso'

import sendRequest from 'utils/send-request'

import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'
import { API_ROUTE } from 'dic/api-route'

export const AUTH_STATUS_DIC = {
	INIT:    'INIT',
	LOADING: 'LOADING',
	LOADED:  'LOADED',
	ERROR:   'ERROR',
} as const

type AuthStatus = typeof AUTH_STATUS_DIC[keyof typeof AUTH_STATUS_DIC]

interface AuthState {
	status: AuthStatus
	isAuth: boolean
}

type AuthAction =
	| { type: 'INIT' }
	| { type: 'LOADING' }
	| { type: 'LOADED'; isAuth: boolean }
	| { type: 'ERROR';  isAuth: boolean }

/**
 * Замыкание, чтобы кешировать запрос
 */
let cachedAuthState: AuthState = {
	status: AUTH_STATUS_DIC.INIT,
	isAuth: false,
}

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
	switch (action.type) {
		case AUTH_STATUS_DIC.INIT:
			return { ...state, status: 'INIT' }
		case AUTH_STATUS_DIC.LOADING:
			return { ...state, status: 'LOADING' }
		case AUTH_STATUS_DIC.LOADED:
			return { ...state, status: 'LOADED', isAuth: action.isAuth }
		case AUTH_STATUS_DIC.ERROR:
			return { ...state, status: 'LOADED', isAuth: action.isAuth }
		default:
			const exhaustiveCheck: never = action
      		throw new Error(`Unhandled action type: ${exhaustiveCheck}`)
	}
}

interface UseAuthReturn {
	isAuth: boolean
	isAuthLoading: boolean
	redirectToLogin: () => void
	routeTo: (url: string, replace?: boolean) => void
}
export const useAuth = (): UseAuthReturn => {
	const { route, path } = useLocation()
	const redirectToLogin = useCallback(() => {
		route(`${ROUTE_LINKS.login}?backpath=${path}`, true)
	}, [path])

	const [state, dispatch] = useReducer(authReducer, cachedAuthState)

	useEffect(() => {
		if (state.status !== AUTH_STATUS_DIC.INIT) return

		cachedAuthState.status = AUTH_STATUS_DIC.LOADING
		dispatch({ type: AUTH_STATUS_DIC.LOADING })

		sendRequest(API_ROUTE.authMe)
			.then(() => {
				cachedAuthState = { isAuth: true, status: AUTH_STATUS_DIC.LOADED}
				dispatch({ type: AUTH_STATUS_DIC.LOADED, isAuth: true })
			})
			.catch(() => {
				cachedAuthState = { isAuth: false, status: AUTH_STATUS_DIC.LOADED}
				dispatch({ type: AUTH_STATUS_DIC.LOADED, isAuth: false })
			})
	}, [state, dispatch])

	return {
		isAuth: state.isAuth,
		isAuthLoading: state.status !== 'LOADED',
		redirectToLogin,
		routeTo: route,
	}
}
