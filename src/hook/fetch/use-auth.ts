import { ValueOf } from 'utils.type'

import { useCallback, useEffect } from 'preact/hooks'
import { useLocation } from 'preact-iso'

import { sendRequest } from 'utils/api/send-request'
import { signal } from '@preact/signals'

import { API_ROUTE } from 'dic/API_ROUTE'
import { API_STATUS } from 'dic/API_STATUS'
import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'

interface AuthState {
	status: ValueOf<typeof API_STATUS>
	isAuth: boolean
}

const authSignal = signal<AuthState>({
	status: API_STATUS.INIT,
	isAuth: false,
})

// Флаг для предотвращения множественных запросов
let requestInProgress = false

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
		if (authSignal.value.status !== API_STATUS.INIT || requestInProgress) return

		requestInProgress = true
		authSignal.value = { ...authSignal.value, status: API_STATUS.LOADING }

		sendRequest(API_ROUTE.authMe)
			.then(() => {
				requestInProgress = false
				authSignal.value = { status: API_STATUS.LOADED, isAuth: true }
			})
			.catch(() => {
				requestInProgress = false
				authSignal.value = { status: API_STATUS.LOADED, isAuth: false }
			})
	}, []) // Должен выполняться однажды при монтировании

	return {
		get isAuth() { return authSignal.value.isAuth },
		get isAuthLoaded() { return authSignal.value.status === API_STATUS.LOADED },
		redirectToLogin,
		routeTo: route,
	}
}
