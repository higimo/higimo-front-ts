import { ApiState, ValuesOptions } from 'api-types/fetch-api.types'
import { ApiRouteType } from 'dic/API_ROUTE'

import { useCallback, useEffect, useReducer } from 'preact/hooks'

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
// мб, перестало работать
// type ApiUrlType = ValueOf<typeof API_ROUTE>
export type ApiUrlType = ApiRouteType

// TODO: [HIGH] написать аналог для использования репозиториями
// TODO: [HIGH] обычно возвращает MyApiType | null, когда пробрасываю дочкам надо проверять на null или EmptyData меня защитит без skipEmpty
export const useApi = <T, M = Object>(
	url: ApiUrlType,
	values: ValuesOptions = {}
): [ApiState<T, M>, () => void] => {
	const [state, dispatch] = useReducer(apiReducer<T, M>, initialState as ApiState<T, M>)

	const fetchData = useCallback(async () => {
		// TODO: [MIDDLE] кажется, надо добавить let cancelled = false
		try {
			dispatch({ type: API_STATUS.LOADING })
			if (isDefaultSkipUrl(url)) {
				// TOOD: не нравится, что здесь null, надо {}, чтоб меньше кода писать
				dispatch({ type: API_STATUS.LOADED, payload: null, meta: undefined })
			} else {
				const { data, meta } = await sendRequest<T, M>(url as string, { values })
				dispatch({ type: API_STATUS.LOADED, payload: data, meta })
			}
		} catch (error) {
			dispatch({ type: API_STATUS.ERROR, payload: error as Error })
		}
	}, [url, JSON.stringify(values)])

	useEffect(() => {
		fetchData()
	}, [url, JSON.stringify(values)])

	return [state, fetchData]
}
