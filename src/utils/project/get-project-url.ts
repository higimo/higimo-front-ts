import { ProjectRoutingFilterNameType } from 'dic/project/PROJECT_FILTER'

import httpBuildQuery from 'http-build-query'

import { ROUTE_LINK } from 'dic/route/ROUTE_LINK'

export const getProjectUrl = (params: { [key in ProjectRoutingFilterNameType]?: string}): string => {
	return `${ROUTE_LINK.projectIndex}?${httpBuildQuery(params)}`
}
