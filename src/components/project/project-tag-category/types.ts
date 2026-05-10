export const PROJECT_FILTER_DIC = {
	FILTER_TAG: 'filterTag',
} as const

export type ProjectRoutingFilterNameType = (typeof PROJECT_FILTER_DIC)[(keyof typeof PROJECT_FILTER_DIC)]
