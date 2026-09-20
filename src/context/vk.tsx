import { VkSessionType } from 'api-types/vk.types'

import { signal } from '@preact/signals'

export type VkSessionStateType =
	| { status: 'INIT'; session: null; error: null }
	| { status: 'LOADING'; session: null; error: null }
	| { status: 'LOADED'; session: VkSessionType; error: null }
	| { status: 'ERROR'; session: null; error: Error }

export const vkSession = signal<VkSessionStateType>({
	status: 'INIT',
	session: null,
	error: null,
})

export const setVkLoading = (): void => {
	vkSession.value = { status: 'LOADING', session: null, error: null }
}

export const setVkLoaded = (session: VkSessionType): void => {
	vkSession.value = { status: 'LOADED', session, error: null }
}

export const setVkError = (error: Error): void => {
	vkSession.value = { status: 'ERROR', session: null, error }
}
