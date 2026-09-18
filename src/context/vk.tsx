import { signal } from '@preact/signals'

import { VkSessionType } from 'api-types/vk.types'

export type VkSessionStatusType = 'INIT' | 'LOADING' | 'LOADED' | 'ERROR'

export type VkSessionStateType = {
	status: VkSessionStatusType
	session: VkSessionType | null
	error: Error | null
}

export const vkSession = signal<VkSessionStateType>({
	status: 'INIT',
	session: null,
	error: null,
})

export const setVkLoading = (): void => {
	vkSession.value = {
		status: 'LOADING',
		session: null,
		error: null,
	}
}

export const setVkLoaded = (session: VkSessionType): void => {
	vkSession.value = {
		status: 'LOADED',
		session,
		error: null,
	}
}

export const setVkError = (error: Error): void => {
	vkSession.value = {
		status: 'ERROR',
		session: null,
		error,
	}
}
