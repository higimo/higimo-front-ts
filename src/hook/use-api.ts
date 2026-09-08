import { KeyOf } from 'utils.type'

import { useEffect, useReducer } from 'preact/hooks'

import sendRequest from 'utils/api/send-request'

import { ApiRouteType } from 'dic/API_ROUTE'

// TODO: [LIGHT] move to hook/fetch
export const API_STATUS = {
	INIT:    'INIT',
	LOADING: 'LOADING',
	LOADED:  'LOADED',
	ERROR:   'ERROR',
} as const

export type ApiStatusNameType = KeyOf<typeof API_STATUS>

type ApiState<T> = {
	status: ApiStatusNameType
	data: T
	meta?: Object
	error?: Error
}

type ApiAction<T> =
	| { type: 'INIT' }
	| { type: 'LOADING' }
	| { type: 'LOADED'; payload: T; meta?: any }
	| { type: 'ERROR';  payload: Error }

const initialState = {
	status: API_STATUS.INIT,
	data: [],
	meta: undefined,
	error: undefined,
}

export const apiReducer = <T,>(state: ApiState<T>, action: ApiAction<T>): ApiState<T> => {
	switch (action.type) {
		case API_STATUS.INIT:
			return { ...state, status: 'INIT' }
		case API_STATUS.LOADING:
			return { ...state, status: 'LOADING' }
		case API_STATUS.LOADED:
			return { ...state, status: 'LOADED', data: action.payload, meta: action.meta }
		case API_STATUS.ERROR:
			return { ...state, status: 'LOADED', error: action.payload, }
		default:
			throw new Error('Unknown action type')
	}
}

const isDefaultSkipUrl = (url: ApiUrlType) => (url as string).slice(-2) === '-1'

// Раскомментировать, чтоб посмотреть ошибки, должны быть только типа API_ROUTE.probbiSingle({ ... })
// мб, перестало работать
// type ApiUrlType = ValueOf<typeof API_ROUTE>
type ApiUrlType = ApiRouteType

// TODO: [HIGH] Добавить ещё POST, DELETE
// TODO: [HIGH] Добавить вывод сразу useLoadingState
// TODO: [HIGH] что если пользоваться ServiceApi, в дополнение к простым строчкам?
// TODO: [LIGHT] Типизировать meta
const useApi = <T,>(url: ApiUrlType, values: Record<string, any> = {}): [ApiState<T>, () => void] => {
	const [state, dispatch] = useReducer(apiReducer<T>, initialState as ApiState<T>)

	const fetchData = async () => {
		try {
			dispatch({ type: API_STATUS.LOADING })
			if (isDefaultSkipUrl(url)) {
				dispatch({ type: API_STATUS.LOADED, payload: ({} as T), meta: undefined })
			} else {
				const { data, meta } = await sendRequest(url as string, { values })
				dispatch({ type: API_STATUS.LOADED, payload: data, meta })
			}
		} catch (error) {
			dispatch({ type: API_STATUS.ERROR, payload: error as Error })
		}
	}

	useEffect(() => {
		fetchData()
	}, [url, JSON.stringify(values)])

	return [state, fetchData]
}

export default useApi
