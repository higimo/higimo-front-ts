export const filterType = {
    FILTER_TAG: 'filterTag',
    FILTER_SIZE: 'filterSize'
} as const

export type ProjectRoutingFilterNameType = (typeof filterType)[(keyof typeof filterType)]