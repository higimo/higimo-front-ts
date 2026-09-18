import { useCallback, useEffect, useReducer } from "preact/hooks"

export const API_STATUS = {
	INIT: 'INIT',
	LOADING: 'LOADING',
	LOADED: 'LOADED',
	ERROR: 'ERROR',
} as const

type ApiStatusName = keyof typeof API_STATUS

export type MultiJsonApiUrls<T> = { [K in keyof T]: string }

export type MultiJsonApiState<T> = {
	/** Агрегированный статус: LOADING пока хоть что-то грузится. */
	status: ApiStatusName
	/** Данные, заполняются по мере завершения запросов. */
	data: Partial<{ [K in keyof T]: T[K] }>
	/** Ошибки по каждому ключу (если были). */
	errors: Partial<Record<keyof T, Error>>
	/** Сколько запросов ещё в полёте. */
	pending: number
}

type MultiJsonApiAction =
	| { type: 'INIT' }
	| { type: 'LOADING'; count: number }
	| { type: 'LOADED'; key: string; payload: unknown }
	| { type: 'ERROR'; key: string; payload: Error }

const multiJsonApiReducer = <T,>(
	state: MultiJsonApiState<T>,
	action: MultiJsonApiAction
): MultiJsonApiState<T> => {
	switch (action.type) {
		case API_STATUS.INIT:
			return { ...state, status: API_STATUS.INIT }

		case API_STATUS.LOADING:
			return {
				...state,
				status: API_STATUS.LOADING,
				errors: {},
				pending: action.count,
			}

		case API_STATUS.LOADED: {
			const pending = Math.max(0, state.pending - 1)
			return {
				...state,
				data: { ...state.data, [action.key]: action.payload } as MultiJsonApiState<T>['data'],
				pending,
				status: pending === 0 ? API_STATUS.LOADED : API_STATUS.LOADING,
			}
		}

		case API_STATUS.ERROR: {
			const pending = Math.max(0, state.pending - 1)
			return {
				...state,
				errors: { ...state.errors, [action.key]: action.payload },
				pending,
				// если больше ничего не грузится и была ошибка — общий статус ERROR
				status: pending === 0 ? API_STATUS.ERROR : API_STATUS.LOADING,
			}
		}

		default:
			return state
	}
}

const multiInitialState = {
	status: API_STATUS.INIT,
	data: {},
	errors: {},
	pending: 0,
} as const

export const useMultiJsonApi = <T extends Record<string, unknown>>(
	urls: MultiJsonApiUrls<T>
): [MultiJsonApiState<T>, () => Promise<void>] => {
	const [state, dispatch] = useReducer(
		multiJsonApiReducer<T>,
		multiInitialState as unknown as MultiJsonApiState<T>
	)

	const keys = Object.keys(urls) as (keyof T & string)[]

	const fetchData = useCallback(async () => {
		dispatch({ type: API_STATUS.LOADING, count: keys.length })

		await Promise.all(
			keys.map(async (key) => {
				const uri = urls[key]
				try {
					const response = await fetch(uri)
					if (!response.ok) {
						throw new Error(`HTTP error! status: ${response.status} (${uri})`)
					}
					const json = await response.json()
					dispatch({ type: API_STATUS.LOADED, key, payload: json })
				} catch (error) {
					dispatch({ type: API_STATUS.ERROR, key, payload: error as Error })
				}
			})
		)
	}, [JSON.stringify(urls)])

	useEffect(() => {
		fetchData()
	}, [fetchData])

	return [state, fetchData]
}
