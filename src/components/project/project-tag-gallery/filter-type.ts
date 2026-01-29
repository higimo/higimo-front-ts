export const filterType = {
	FILTER_TAG: 'filterTag',
} as const

export type ProjectRoutingFilterNameType = (typeof filterType)[(keyof typeof filterType)]