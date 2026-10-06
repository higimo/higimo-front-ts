import { MetaApiType } from 'api-types/fetch-api.types';
import { API_STATUS } from 'dic/API_STATUS';
import { ApiState, ApiAction } from './use-api';

// TODO: [MIDDLE] используется ещё в useJsonApi, useMultiJsonApi
export const apiReducer = <T, M = MetaApiType>(
	state: ApiState<T, M>,
	action: ApiAction<T, M>
): ApiState<T, M> => {
	switch (action.type) {
		case API_STATUS.INIT:
			return { ...state, status: API_STATUS.INIT };
		case API_STATUS.LOADING:
			return { ...state, status: API_STATUS.LOADING };
		case API_STATUS.LOADED:
			return { ...state, status: API_STATUS.LOADED, data: action.payload, meta: action.meta };
		case API_STATUS.ERROR:
			return { ...state, status: API_STATUS.ERROR, error: action.payload };
		default:
			throw new Error('Unknown action type');
	}
};
