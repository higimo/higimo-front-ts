import { ApiAction, ApiState, MetaApiType } from 'api-types/fetch-api.types'
import { API_STATUS } from 'dic/API_STATUS'

// TODO: а можно без isRevalidating повсюду?
export const apiReducer = <T, M = MetaApiType>(
	state: ApiState<T, M>,
	action: ApiAction<T, M>
): ApiState<T, M> => {
	switch (action.type) {
		case API_STATUS.INIT:
			return { status: API_STATUS.INIT, data: null, meta: undefined, isRevalidating: false }
		case API_STATUS.LOADING:
			return { ...state, status: API_STATUS.LOADING, isRevalidating: false }
		case API_STATUS.REVALIDATE:
			return { ...state, isRevalidating: true, error: undefined }
		case API_STATUS.LOADED:
			return { ...state, status: API_STATUS.LOADED, data: action.payload, meta: action.meta, isRevalidating: false }
		case API_STATUS.ERROR:
			return { ...state, status: API_STATUS.ERROR, error: action.payload, isRevalidating: false }
		default:
			throw new Error('Unknown action type')
	}
}
