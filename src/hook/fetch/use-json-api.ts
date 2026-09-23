import { useEffect, useCallback, useReducer } from 'preact/hooks'

import { API_STATUS } from 'dic/API_STATUS'

type ApiStatusName = keyof typeof API_STATUS

type JsonApiState<T> = {
	status: ApiStatusName
	data: T
	error: Error | null
}

type JsonApiAction<T> =
	| { type: 'INIT' }
	| { type: 'LOADING' }
	| { type: 'LOADED', payload: T }
	| { type: 'ERROR', payload: Error }

const jsonApiReducer = <T>(
	state: JsonApiState<T>,
	action: JsonApiAction<T>
): JsonApiState<T> => {
	switch (action.type) {
		case API_STATUS.INIT:
			return { ...state, status: API_STATUS.INIT }
		case API_STATUS.LOADING:
			return { ...state, status: API_STATUS.LOADING, error: null }
		case API_STATUS.LOADED:
			return { ...state, status: API_STATUS.LOADED, data: action.payload, error: null }
		case API_STATUS.ERROR:
			return { ...state, status: API_STATUS.ERROR, error: action.payload }
		default:
			return state
	}
}

const initialState = {
	status: API_STATUS.INIT,
	data: null,
	error: null,
} as const

export const useJsonApi = <T,>(uri: string): [JsonApiState<T>, () => Promise<void>] => {
	const [state, dispatch] = useReducer(jsonApiReducer<T>, initialState as JsonApiState<T>)

	// Функция выполнения запроса (будет возвращена как refetch)
	const fetchData = useCallback(async () => {
		dispatch({ type: API_STATUS.LOADING })

		try {
			const response = await fetch(uri)
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`)
			}
			const json = await response.json()
			dispatch({ type: API_STATUS.LOADED, payload: json as T })
		} catch (error) {
			dispatch({ type: API_STATUS.ERROR, payload: error as Error })
		}
	}, [uri])

	useEffect(() => {
		fetchData()
	}, [fetchData])

	return [state, fetchData]
}
