import { ValueOf } from 'utils.type'

export const PROJECT_FILTER_DIC = {
	FILTER_TAG: 'filterTag',
} as const

export type ProjectRoutingFilterNameType = ValueOf<typeof PROJECT_FILTER_DIC>
