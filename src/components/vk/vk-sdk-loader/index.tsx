import { FunctionComponent, useEffect } from 'preact/compat'

import { setVkError, setVkLoaded, setVkLoading, vkSession } from 'context/vk'

import { loadOpenApi } from './load-openapi'
import { startVkSdk, VkAuthResultType } from './vk-sdk'

export const VkSdkLoader: FunctionComponent = () => {
	useEffect(() => {
		if (window.VK && vkSession.value.status === 'LOADED') {
			return undefined
		}

		const handleAuth = ({ status, session }: VkAuthResultType): void => {
			if (status === 'connected' && session) {
				setVkLoaded(session)
				return
			}

			setVkError(new Error(`VK auth status: ${status}`))
		}

		const boot = (): void => {
			try {
				setVkLoading()
				// TODO: [HARD] пора переходить на VK ID, чтобы каждый раз не открывался попап авторизации
				startVkSdk(handleAuth)
			} catch (err) {
				setVkError(err instanceof Error ? err : new Error('VK init failed'))
			}
		}

		if (window.VK) {
			boot()
			return undefined
		}

		const container = document.getElementById('vk_api_transport')
		if (!container) {
			setVkError(new Error('#vk_api_transport not found'))
			return undefined
		}

		return loadOpenApi({ container, onReady: boot, onLoadError: setVkError })
	}, [])

	return null
}
