import { FunctionComponent } from 'preact'
import { VkAuthResultType, VkSessionType } from 'api-types/vk.types'

import { useSdkLoader } from 'hook/use-sdk-loader'

import { injectScript } from 'utils/sdk/inject-script'

import { setVkError, setVkLoaded, setVkLoading, vkSession } from 'context/vk-signal'

import { VK_API_ID, VK_API_VERSION, VK_SCOPE } from 'config/VK-API-ID'
import { VK_SCRIPT_SRC } from 'config/VK-SCRIPT-SRC'

export const VkSdkLoader: FunctionComponent = () => {
	useSdkLoader<VkSessionType>({
		ready: () => {
			if (window.VK && vkSession.value.status === 'LOADED') {
				return { ready: true, data: vkSession.value.data }
			}
			return { ready: false }
		},
		load: () => {
			const container = document.getElementById('vk_api_transport')
			if (!container) {
				throw new Error('#vk_api_transport not found')
			}
			return injectScript(VK_SCRIPT_SRC, {
				container,
				readyCallback: 'vkAsyncInit',
			})
		},
		init: () => new Promise<VkSessionType>((resolve, reject) => {
			// TODO: [LAST] пора переходить на VK ID, чтобы каждый раз не открывался попап авторизации
			VK.init({ apiId: VK_API_ID, apiVersion: VK_API_VERSION })
			VK.Auth.login(({ status, session }: VkAuthResultType) => {
				if (status === 'connected' && session) {
					resolve(session)
					return
				}
				reject(new Error(`VK auth status: ${status}`))
			}, VK_SCOPE)
		}),
		onLoading: setVkLoading,
		onLoaded: setVkLoaded,
		onError: setVkError,
	})

	return null
}
