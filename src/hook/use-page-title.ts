import { useEffect } from 'preact/hooks'

export const SITE_POSTFIX = 'Хигимо'

// TODO: вот бы он пробовал взять заголовок из src\dic\router.ts

/**
 * Хук для управления заголовком страницы
 */
export const usePageTitle = (title: string | string[], fallback?: string) => {
	useEffect(() => {
		if (Array.isArray(title)) {
			document.title = [...title, SITE_POSTFIX].join(' | ')
		} else if (title) {
			document.title = title + ' | ' + SITE_POSTFIX
		} else if (fallback) {
			document.title = fallback + ' | ' + SITE_POSTFIX
		} else {
			document.title = SITE_POSTFIX
		}
	}, [title, fallback])
}
