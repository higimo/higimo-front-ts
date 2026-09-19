import { KeyOf } from 'utils.type'
import { VkSessionType } from 'api-types/vk.types'

import { signal } from '@preact/signals'

import { API_STATUS } from 'dic/API_STATUS'

export type VkSessionStateType = {
	status: KeyOf<typeof API_STATUS>
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
