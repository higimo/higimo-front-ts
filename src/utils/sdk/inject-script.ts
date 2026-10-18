type InjectScriptOptionsType = {
	/** Куда вставить тег. По умолчанию — document.body */
	container?: HTMLElement
	/** Таймаут загрузки */
	timeoutMs?: number
	/**
	 * Если задан — `promise` резолвится по вызову `window[readyCallback]`,
	 * а не по `onload`. Нужно для SDK, которые сигналят о готовности
	 * через глобальный колбэк (VK: `vkAsyncInit`).
	 */
	readyCallback?: string
}

type InjectScriptResultType = {
	/** Резолвится по `onload`, реджектится по `onerror` или таймауту */
	promise: Promise<void>
	/** Удаляет тег и снимает таймер. Нет-оп, если тег уже был в DOM */
	cleanup: () => void
}

/**
 * Инжектит `<script src>` в документ
 * Идемпотентно: если тег уже есть — `promise` резолвится сразу, `cleanup` — нет-оп
 * По `onerror`/таймауту тег удаляется и `promise` реджектится
 *
 * https://developer.tbank.ru/eacq/intro/developer/setup_js/
 */
export const injectScript = (
	src: string,
	options: InjectScriptOptionsType = {}
): InjectScriptResultType => {
	const { container = document.body, timeoutMs = 15000, readyCallback } = options

	const existing = document.querySelector<HTMLScriptElement>(`script[src="${src}"]`)
	if (existing) {
		return { promise: Promise.resolve(), cleanup: () => {} }
	}

	const script = document.createElement('script')
	script.src = src
	script.async = true

	let timer: number | undefined

	const promise = new Promise<void>((resolve, reject) => {
		timer = window.setTimeout(() => {
			script.remove()
			reject(new Error(`Script load timeout: ${src}`))
		}, timeoutMs)

		if (readyCallback) {
			// VK-подобные SDK: ждём глобальный колбэк, onload игнорируем
			;(window as unknown as Record<string, unknown>)[readyCallback] = () => {
				window.clearTimeout(timer)
				resolve()
			}
		}

		script.onload = () => {
			if (readyCallback) return // ждём колбэк, а не onload
			window.clearTimeout(timer)
			resolve()
		}

		script.onerror = () => {
			window.clearTimeout(timer)
			script.remove()
			reject(new Error(`Failed to load script: ${src}`))
		}
	})

	container.appendChild(script)

	return {
		promise,
		cleanup: () => {
			window.clearTimeout(timer)
			script.remove()
			if (readyCallback) {
				delete (window as unknown as Record<string, unknown>)[readyCallback]
			}
		},
	}
}
