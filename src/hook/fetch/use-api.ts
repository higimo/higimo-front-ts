import { ApiState, ValuesOptions } from 'api-types/fetch-api.types'
import { ApiRouteType } from 'dic/route/API_ROUTE'

import { useCallback, useEffect, useReducer, useRef } from 'preact/hooks'

import { apiReducer } from 'utils/api/api-reducer'
import { isDefaultSkipUrl } from 'utils/types/is-default-skip-url'
import { sendRequest } from 'utils/api/send-request'

import { API_STATUS } from 'dic/API_STATUS'

const initialState = {
	status: API_STATUS.INIT,
	data: [],
	meta: undefined,
	error: undefined,
}

// Раскомментировать, чтоб посмотреть ошибки, должны быть только типа API_ROUTE.probbiSingle({ ... })
// export type ApiUrlType = ValueOf<typeof API_ROUTE>
export type ApiUrlType = ApiRouteType

// TODO: [HIGH] написать аналог для использования репозиториями
// TODO: [HIGH] обычно возвращает MyApiType | null, когда пробрасываю дочкам надо проверять на null или EmptyData меня защитит без skipEmpty
export const useApi = <T, M = Object>(
	url: ApiUrlType,
	values: ValuesOptions = {}
): [ApiState<T, M>, () => void] => {
	const [state, dispatch] = useReducer(apiReducer<T, M>, initialState as ApiState<T, M>)
	const abortRef = useRef<AbortController | null>(null)

	// ключ идентичности запроса: сменился — значит это другой ресурс,
	// stale от прошлого показывать нельзя
	const requestKey = `${url}|${JSON.stringify(values)}`
	const prevKeyRef = useRef<string | null>(null)

	// помнит, что по текущему ключу данные уже успешно грузились.
	// при смене ключа сбрасывается
	const hasLoadedRef = useRef(false)

	const fetchData = useCallback(async () => {
		// отменяем предыдущий запрос, если он ещё летит
		abortRef.current?.abort()

		const controller = new AbortController()
		abortRef.current = controller
		const { signal } = controller

		// если данные уже были — ревалидируем, не сбрасывая контент
		dispatch({ type: hasLoadedRef.current ? 'REVALIDATE' : 'LOADING' })

		try {
			if (isDefaultSkipUrl(url)) {
				if (signal.aborted) {
					return
				}
				hasLoadedRef.current = true
				// TODO: [HARD] не нравится, что здесь null, надо {}, чтоб меньше кода писать
				dispatch({ type: API_STATUS.LOADED, payload: null, meta: undefined })
			} else {
				const { data, meta } = await sendRequest<T, M>(url as string, { values, signal })

				if (signal.aborted) {
					return
				}
				hasLoadedRef.current = true
				dispatch({ type: API_STATUS.LOADED, payload: data, meta })
			}
		} catch (error) {
			// отмена — это не ошибка не пишем в стейт
			if (signal.aborted || (error as Error)?.name === 'AbortError') {
				return
			}
			dispatch({ type: API_STATUS.ERROR, payload: error as Error })
		}
	}, [url, requestKey])

	useEffect(() => {
		const isNewResource = prevKeyRef.current !== null && prevKeyRef.current !== requestKey
		prevKeyRef.current = requestKey

		if (isNewResource) {
			// сбрасываем и данные, и маркер stale — это другой ресурс
			hasLoadedRef.current = false
			dispatch({ type: 'INIT' })
		}

		fetchData()
		return () => {
			// при размонтировании (и перед следующим эффектом) — отменяем
			abortRef.current?.abort()
		}
	}, [url, requestKey])

	return [state, fetchData]
}
