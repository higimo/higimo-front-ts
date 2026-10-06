import { ApiStatusNameType } from 'api-types/fetch-api.types'

import { API_STATUS } from 'dic/API_STATUS'

const LOADING_STATUS_SET = new Set<ApiStatusNameType>([API_STATUS.INIT, API_STATUS.LOADING])

export const useLoadingState = (statuses: ApiStatusNameType[]) =>
	statuses.some(status => LOADING_STATUS_SET.has(status))
