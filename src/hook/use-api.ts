import { useEffect, useReducer } from 'preact/hooks'

import sendRequest from 'utils/send-request'
import { ApiRouteType } from 'dic/api-route'

export const API_STATUS = {
	INIT: 'INIT',
	LOADING: 'LOADING',
	LOADED: 'LOADED',
	ERROR: 'ERROR',
} as const

export type ApiStatusNameType = keyof typeof API_STATUS
export type ApiStatusValueType = typeof API_STATUS[keyof typeof API_STATUS]

type ApiState<T> = {
	status: ApiStatusNameType
	data: T[]
	error?: Error
}

type ApiAction<T> =
	| { type: 'INIT' }
	| { type: 'LOADING' }
	| { type: 'LOADED'; payload: T[] }
	| { type: 'ERROR'; payload: Error }

const initialState = {
	status: 'INIT',
	data: [],
}

const apiReducer = <T,>(state: ApiState<T>, action: ApiAction<T>): ApiState<T> => {
	switch (action.type) {
		case 'INIT':
			return { ...state, status: 'INIT' }
		case 'LOADING':
			return { ...state, status: 'LOADING' }
		case 'LOADED':
			return { ...state, status: 'LOADED', data: action.payload }
		case 'ERROR':
			return { ...state, status: 'LOADED', error: action.payload }
		default:
			throw new Error('Unknown action type')
	}
}

// Раскомментировать, чтоб посмотреть ошибки, должны быть только типа API_ROUTE.probbiSingle({ ... })
// type ApiUrlType = typeof API_ROUTE[keyof typeof API_ROUTE]
type ApiUrlType = ApiRouteType

const useApi = <T,>(url: ApiUrlType, values: Record<string, any> = {}): [ApiState<T>, () => void] => {
	const [state, dispatch] = useReducer(apiReducer<T>, initialState as ApiState<T>)

	const fetchData = async () => {
		try {
			dispatch({ type: 'LOADING' })
			const data: T[] = await sendRequest(url as string, { values })
			dispatch({ type: 'LOADED', payload: data })
		} catch (error) {
			dispatch({ type: 'ERROR', payload: error as Error })
		}
	}

	useEffect(() => {
		fetchData()
	}, [url, JSON.stringify(values)])

	return [state, fetchData]
}

export default useApi
