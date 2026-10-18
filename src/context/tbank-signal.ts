import { SdkStateType } from 'api-types/sdk-state.types'

import { signal } from '@preact/signals'

/**
 * У TBank нет авторизации/сессии — `data` это просто `true`,
 * когда `PaymentIntegration` готов к работе.
 */
export type TbankStateType = SdkStateType<true>

export const tbankSdk = signal<TbankStateType>({
	status: 'INIT',
	data: null,
	error: null,
})

export const setTbankLoading = (): void => {
	tbankSdk.value = { status: 'LOADING', data: null, error: null }
}

export const setTbankLoaded = (): void => {
	if (tbankSdk.value.status === 'LOADED') {
		return
	}
	tbankSdk.value = { status: 'LOADED', data: true, error: null }
}

export const setTbankError = (error: Error): void => {
	tbankSdk.value = { status: 'ERROR', data: null, error }
}
