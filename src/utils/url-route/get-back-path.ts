import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'

export const getBackPath = (fallbackUrl = ROUTE_LINKS.adminIndex) => {
	const searchParams = new URLSearchParams(location.search)
	return searchParams.get('backpath') || fallbackUrl
}
