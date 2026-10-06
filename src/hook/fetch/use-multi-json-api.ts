import { ApiAction, ApiState } from 'api-types/fetch-api.types'

import { useCallback, useEffect, useMemo, useReducer } from 'preact/hooks'

import { apiReducer } from 'utils/api/api-reducer'

import { API_STATUS } from 'dic/API_STATUS'

export type MultiJsonApiUrls<T> = { [K in keyof T]: string }

/**
 * Состояние по каждому ключу — то же, что в useApi, но в словаре.
 */
export type MultiJsonApiState<T> = { [K in keyof T]: ApiState<T[K]> }

/**
 * Экшен верхнего уровня: какой ключ и какой ApiAction к нему применить.
 */
export type MultiJsonApiAction<T> = {
	[K in keyof T]: { key: K, action: ApiAction<T[K]> }
}[keyof T]

export const multiJsonApiReducer = <T,>(
	state: MultiJsonApiState<T>,
	{ key, action }: MultiJsonApiAction<T>,
): MultiJsonApiState<T> => ({
	...state,
	[key]: apiReducer(state[key], action as ApiAction<T[typeof key]>),
})

const createInitialState = <T extends Record<string, unknown>>(
	keys: readonly (keyof T & string)[],
): MultiJsonApiState<T> =>
	Object.fromEntries(
		keys.map((key) => [
			key,
			{ status: API_STATUS.INIT, data: null, meta: undefined, error: undefined },
		]),
	) as MultiJsonApiState<T>

/**
 * Запрашивать из JSON-API данные из нескольких источников,
 * расставляя их по указанным key.
 * @param urls объект из key: url
 *
 * @example
 * ```ts
 * const [ data, refetch ] = useMultiJsonApi<{
 * 	books: BookApiType[]
 * 	cinema: CinemaApiType[]
 * }>({
 * 	books: '/json/books.json',
 * 	cinema: '/json/cinema.json',
 * })
 *
 * data.books.status // ApiStatusName
 * data.books.data   // BookApiType[] | null
 * data.cinema.error // Error | undefined
 * ```
 */
export const useMultiJsonApi = <T extends Record<string, unknown>>(
	urls: MultiJsonApiUrls<T>
): [MultiJsonApiState<T>, () => Promise<void>] => {

	const keys = useMemo(
		() => Object.keys(urls) as (keyof T & string)[],
		[JSON.stringify(urls)],
	)

	const [state, dispatch] = useReducer(
		multiJsonApiReducer<T>,
		keys,
		createInitialState<T>,
	)

	const fetchData = useCallback(async () => {
		keys.forEach((key) => {
			dispatch({ key, action: { type: API_STATUS.LOADING } })
		})

		await Promise.all(
			keys.map(async (key) => {
				const uri = urls[key]
				try {
					const response = await fetch(uri)
					if (!response.ok) {
						throw new Error(`HTTP error! status: ${response.status} (${uri})`)
					}
					const json = (await response.json()) as T[typeof key]
					dispatch({ key, action: { type: API_STATUS.LOADED, payload: json } })
				} catch (error) {
					dispatch({ key, action: { type: API_STATUS.ERROR, payload: error as Error } })
				}
			}),
		)
	}, [keys, JSON.stringify(urls)])

	useEffect(() => {
		fetchData()
	}, [fetchData])

	return [state, fetchData]
}
