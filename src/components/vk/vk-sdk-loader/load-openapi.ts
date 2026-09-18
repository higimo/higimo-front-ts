const VK_SCRIPT_SRC = 'https://vk.ru/js/api/openapi.js?169'

declare global {
	interface Window {
		vkAsyncInit?: () => void
	}
}

type LoadOpenApiOptionsType = {
	container: HTMLElement
	onReady: () => void
	onLoadError: (error: Error) => void
}

/**
 * Загружает openapi.js в контейнер.
 */
export const loadOpenApi = ({ container, onReady, onLoadError }: LoadOpenApiOptionsType): (() => void) => {
	window.vkAsyncInit = onReady

	const script = document.createElement('script')
	script.src = VK_SCRIPT_SRC
	script.async = true
	script.onerror = () => onLoadError(new Error('Failed to load VK API script'))
	container.appendChild(script)

	return () => {
		script.remove()
		delete window.vkAsyncInit
	}
}
