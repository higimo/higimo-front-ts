import { MerchantProductType } from 'api-types/merchant.types'
import { signal } from '@preact/signals'
import { API_STATUS } from 'dic/API_STATUS'
import { ApiState } from 'api-types/fetch-api.types';

export const merchantProductSignal = signal<ApiState<MerchantProductType[], Object>>({
	status: API_STATUS.INIT,
	data:   null,
	error:  undefined,
})

export const setMerchantLoading = (): void => {
	merchantProductSignal.value = {
		status: API_STATUS.LOADING,
		data:   null,
		error:  undefined,
	}
}

export const setMerchantLoaded = (data: MerchantProductType[]): void => {
	merchantProductSignal.value = {
		status: API_STATUS.LOADED,
		data,
		error: undefined,
	}
}

export const setMerchantError = (error: Error): void => {
	merchantProductSignal.value = {
		status: API_STATUS.ERROR,
		data:   null,
		error,
	}
}

export const getMerchantProductById = (
	id: MerchantProductType['id'],
): MerchantProductType | null => {
	return merchantProductSignal.value.data?.find(product => product.id === id) ?? null
}
