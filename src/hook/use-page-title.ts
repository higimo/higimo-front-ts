import { BREADCRUMS_DIC, isRouteType } from 'dic/router'
import { useRoute } from 'preact-iso'
import { useEffect } from 'preact/hooks'

export const SITE_POSTFIX = 'Хигимо'

const normaliseUrl = (path: string) => {
	return path + (path[path.length - 1] === '/' ? '' : '/')
}

/**
 * Хук для управления заголовком страницы
 */
export const usePageTitle = (title: string | string[], fallback?: string) => {
	const { path } = useRoute()

	useEffect(() => {
		const route = normaliseUrl(path)

		if (Array.isArray(title)) {
			// TODO: [LIGHT] use concat array
			document.title = [...title, SITE_POSTFIX].join(' | ')
		} else if (title) {
			document.title = title + ' | ' + SITE_POSTFIX
		} else if (fallback) {
			document.title = fallback + ' | ' + SITE_POSTFIX
		} else if (isRouteType(route) && BREADCRUMS_DIC[route]) {
			document.title = BREADCRUMS_DIC[route] + ' | ' + SITE_POSTFIX
		} else {
			document.title = SITE_POSTFIX
		}
	}, [title, fallback, path])
}
