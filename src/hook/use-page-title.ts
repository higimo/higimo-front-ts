import { useEffect } from 'preact/hooks'

const POSTFIX = 'Хигимо'

/**
 * Хук для управления заголовком страницы
 */
export const usePageTitle = (title: string | string[], fallback?: string) => {
	useEffect(() => {
		if (Array.isArray(title)) {
			document.title = [...title, POSTFIX].join(' | ')
		} else if (title) {
			document.title = title + ' | ' + POSTFIX
		} else if (fallback) {
			document.title = fallback + ' | ' + POSTFIX
		} else {
			document.title = POSTFIX
		}
	}, [title, fallback])
}
