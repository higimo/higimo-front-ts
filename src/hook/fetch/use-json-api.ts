import { useState, useEffect } from 'preact/hooks'

// TODO: [LIGHT] move to hook/fetch
// TODO: [LIGHT] перенести в hook/{loading}/useJson
// TODO: [LIGHT] добавить isLoading и прочая
export const useJsonApi = <T,>(uri: string) => {
	const [data, setData] = useState<T|null>(null)

	useEffect(() => {
		fetch(uri)
			.then(r => r.json())
			.then(data => {
				setData(data)
			})
	}, [])

	return data
}






// TODO: [LIGHT] переписать реализацию с isLoading error
// export const API_STATUS = {
// 	INIT: 'INIT',
// 	LOADING: 'LOADING',
// 	LOADED: 'LOADED',
// 	ERROR: 'ERROR',
// } as const

// type ApiStatusName = keyof typeof API_STATUS

// type JsonApiState<T> = {
// 	status: ApiStatusName
// 	data: T | null
// 	error: Error | null
// }

// type JsonApiAction<T> =
// 	| { type: 'INIT' }
// 	| { type: 'LOADING' }
// 	| { type: 'LOADED'; payload: T }
// 	| { type: 'ERROR'; payload: Error }

// const jsonApiReducer = <T>(
// 	state: JsonApiState<T>,
// 	action: JsonApiAction<T>
// ): JsonApiState<T> => {
// 	switch (action.type) {
// 		case API_STATUS.INIT:
// 			return { ...state, status: API_STATUS.INIT }
// 		case API_STATUS.LOADING:
// 			return { ...state, status: API_STATUS.LOADING, error: null }
// 		case API_STATUS.LOADED:
// 			return { ...state, status: API_STATUS.LOADED, data: action.payload, error: null }
// 		case API_STATUS.ERROR:
// 			return { ...state, status: API_STATUS.ERROR, error: action.payload }
// 		default:
// 			return state
// 	}
// }

// const initialState = {
// 	status: API_STATUS.INIT,
// 	data: null,
// 	error: null,
// } as const

// // Основной хук
// export const useJsonApi = <T,>(uri: string): [JsonApiState<T>, () => void] => {
// 	const [state, dispatch] = useReducer(jsonApiReducer<T>, initialState as JsonApiState<T>)

// 	// Функция выполнения запроса (будет возвращена как refetch)
// 	const fetchData = useCallback(async () => {
// 		if (!uri) {
// 			// Если uri нет, можно перевести в INIT или оставить как есть
// 			dispatch({ type: API_STATUS.INIT })
// 			return
// 		}

// 		dispatch({ type: API_STATUS.LOADING })

// 		try {
// 			const response = await fetch(uri)
// 			if (!response.ok) {
// 				throw new Error(`HTTP error! status: ${response.status}`)
// 			}
// 			const json = await response.json()
// 			dispatch({ type: API_STATUS.LOADED, payload: json as T })
// 		} catch (error) {
// 			dispatch({ type: API_STATUS.ERROR, payload: error as Error })
// 		}
// 	}, [uri])

// 	// Автоматический запрос при монтировании и изменении uri
// 	useEffect(() => {
// 		fetchData()
// 	}, [fetchData]) // fetchData зависит от uri, поэтому эффект сработает при его изменении

// 	return [state, fetchData]
// }
