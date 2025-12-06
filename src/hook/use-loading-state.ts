import { API_STATUS, ApiStatusNameType } from 'hook/use-api'

const LOADING_STATUS_SET = new Set<ApiStatusNameType>([API_STATUS.INIT, API_STATUS.LOADING])


export const useLoadingState = (statuses: ApiStatusNameType[]) => 
	statuses.some(status => LOADING_STATUS_SET.has(status))