import { SdkStateType } from 'api-types/sdk-state.types'
import { VkSessionType } from 'api-types/vk.types'

import { signal } from '@preact/signals'

export const vkSession = signal<SdkStateType<VkSessionType>>({
	status: 'INIT',
	data: null,
	error: null,
})

export const setVkLoading = (): void => {
	vkSession.value = { status: 'LOADING', data: null, error: null }
}

export const setVkLoaded = (data: VkSessionType): void => {
	if (vkSession.value.status === 'LOADED' && vkSession.value.data === data) {
		return
	}
	vkSession.value = { status: 'LOADED', data, error: null }
}

export const setVkError = (error: Error): void => {
	vkSession.value = { status: 'ERROR', data: null, error }
}
