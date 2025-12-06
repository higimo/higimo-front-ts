import { useEffect } from "preact/hooks"

/**
 * Хук для управления заголовком страницы
 */
export const usePageTitle = (title: string) => {
	useEffect(() => {
		document.title = title
	}, [title])
}