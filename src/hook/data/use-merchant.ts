import { MerchantProductType } from 'api-types/merchant.types'
import { ValueOf } from 'utils.type'

import { useEffect } from 'preact/hooks'

import { sendRequest } from 'utils/api/send-request'
import { signal } from '@preact/signals'

import { API_ROUTE } from 'dic/API_ROUTE'
import { API_STATUS } from 'dic/API_STATUS'

interface MerchantProductState {
	status: ValueOf<typeof API_STATUS>
	products: MerchantProductType[]
}

const merchantProductSignal = signal<MerchantProductState>({
	status: API_STATUS.INIT,
	products: [],
});

// Флаг для предотвращения множественных запросов
let requestInProgress = false;

interface UseAuthReturn {
	products: MerchantProductType[]
	isProductLoaded: boolean
	isProductEmpty: boolean
}
/**
 * Хук, который однажды загружает данные о товарах магазина и предоставляет их для использования всюду
 */
export const useMerchant = (): UseAuthReturn => {
	useEffect(() => {
		if (merchantProductSignal.value.status !== API_STATUS.INIT || requestInProgress) return;

		requestInProgress = true;
		merchantProductSignal.value = {
			...merchantProductSignal.value,
			status: API_STATUS.LOADING
		};

		sendRequest(API_ROUTE.merchantProducts)
			.then((products) => {
				merchantProductSignal.value = {
					status: API_STATUS.LOADED,
					products: products.data,
				};
			})
			.catch(() => {
				requestInProgress = false;
				merchantProductSignal.value = {
					status: API_STATUS.LOADED,
					products: [],
				};
			});
	}, [])

	return {
		get products() { return merchantProductSignal.value.products },
		get isProductLoaded() { return merchantProductSignal.value.status === API_STATUS.LOADED },
		get isProductEmpty() { return !merchantProductSignal.value.products.length },
	};
}
