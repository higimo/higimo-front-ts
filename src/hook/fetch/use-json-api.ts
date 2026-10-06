import { ApiState } from 'api-types/fetch-api.types'

import { useEffect, useCallback, useReducer } from 'preact/hooks'

import { apiReducer } from 'utils/api/api-reducer'

import { API_STATUS } from 'dic/API_STATUS'

const createInitialState = <T,>(): ApiState<T> => ({
	status: API_STATUS.INIT,
	data: null,
	meta: undefined,
	error: undefined,
})

export const useJsonApi = <T,>(uri: string): [ApiState<T>, () => Promise<void>] => {
	const [state, dispatch] = useReducer(
		apiReducer<T>,
		undefined,
		createInitialState<T>,
	)

	const fetchData = useCallback(async () => {
		dispatch({ type: API_STATUS.LOADING })

		try {
			const response = await fetch(uri)
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`)
			}
			const json = (await response.json()) as T
			dispatch({ type: API_STATUS.LOADED, payload: json })
		} catch (error) {
			dispatch({ type: API_STATUS.ERROR, payload: error as Error })
		}
	}, [uri])

	useEffect(() => {
		fetchData()
	}, [fetchData])

	return [state, fetchData]
}
