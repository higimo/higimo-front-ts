import { useEffect } from 'preact/hooks'

type ReadyResultType<T> =
	| { ready: true; data: T }
	| { ready: false }

type LoadResultType = {
	promise: Promise<void>
	cleanup?: () => void
}

type UseSdkLoaderOptionsType<T> = {
	/** SDK полностью готов? Если да — синхронизирует `onLoaded` и выходит. */
	ready: () => ReadyResultType<T>
	/** Загрузить скрипт (обычно `injectScript`). */
	load: () => LoadResultType
	/** Инициализировать SDK после загрузки. */
	init: () => Promise<T>
	onLoading: () => void
	onLoaded: (data: T) => void
	onError: (error: Error) => void
}

export const useSdkLoader = <T>({
	ready,
	load,
	init,
	onLoading,
	onLoaded,
	onError,
}: UseSdkLoaderOptionsType<T>): void => {
	useEffect(() => {
		const state = ready()
		if (state.ready) {
			onLoaded(state.data)
			return undefined
		}

		let cancelled = false
		let cleanup: (() => void) | undefined

		onLoading()

		;(async () => {
			try {
				const handle = load()
				cleanup = handle.cleanup
				await handle.promise
				if (cancelled) return

				const data = await init()
				if (cancelled) return

				onLoaded(data)
			} catch (err) {
				if (cancelled) return
				onError(err instanceof Error ? err : new Error('SDK init failed'))
			}
		})()

		return () => {
			cancelled = true
			cleanup?.()
		}
	}, [])
}
