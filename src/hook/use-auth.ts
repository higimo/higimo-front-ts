import { useEffect, useCallback, useReducer } from 'preact/hooks'
import { useLocation } from 'preact-iso'

import sendRequest from 'utils/send-request'

import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'
import { API_ROUTE } from 'dic/api-route'

import { signal } from '@preact/signals';

export const AUTH_STATUS_DIC = {
	INIT:    'INIT',
	LOADING: 'LOADING',
	LOADED:  'LOADED',
	ERROR:   'ERROR',
} as const

interface AuthState {
	status: typeof AUTH_STATUS_DIC[keyof typeof AUTH_STATUS_DIC]
	isAuth: boolean
}

const authSignal = signal<AuthState>({
	status: AUTH_STATUS_DIC.INIT,
	isAuth: false,
});

// Флаг для предотвращения множественных запросов
let requestInProgress = false;

interface UseAuthReturn {
	isAuth: boolean
	isAuthLoaded: boolean
	redirectToLogin: () => void
	routeTo: (url: string, replace?: boolean) => void
}
// TODO: [HARD] при авторизации может потребоваться перезагрузить данные — надо прокидывать ручку для этого отсюда
export const useAuth = (): UseAuthReturn => {
	const { route, path } = useLocation()

	const redirectToLogin = useCallback(() => {
		route(`${ROUTE_LINKS.login}?backpath=${path}`, true)
	}, [path])

	useEffect(() => {
		if (authSignal.value.status !== AUTH_STATUS_DIC.INIT || requestInProgress) return;

		requestInProgress = true;
		authSignal.value = { ...authSignal.value, status: AUTH_STATUS_DIC.LOADING };

		sendRequest(API_ROUTE.authMe)
			.then(() => {
				requestInProgress = false;
				authSignal.value = { status: AUTH_STATUS_DIC.LOADED, isAuth: true };
			})
			.catch(() => {
				requestInProgress = false;
				authSignal.value = { status: AUTH_STATUS_DIC.LOADED, isAuth: false };
			});
	}, []) // Должен выполняться однажды при монтировании

	return {
		get isAuth() { return authSignal.value.isAuth; },
		get isAuthLoaded() { return authSignal.value.status === AUTH_STATUS_DIC.LOADED; },
		redirectToLogin,
		routeTo: route,
	};
}
