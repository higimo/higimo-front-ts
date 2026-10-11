import { ROUTE_LINK } from 'dic/route/ROUTE_LINK'

export const getBackPath = (fallbackUrl = ROUTE_LINK.adminIndex) => {
	const searchParams = new URLSearchParams(location.search)
	return searchParams.get('backpath') || fallbackUrl
}
