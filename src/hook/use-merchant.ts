import { useEffect } from 'preact/hooks'

import sendRequest from 'utils/api/send-request'

import { API_ROUTE } from 'dic/API_ROUTE'

import { signal } from '@preact/signals'
import { MerchantProductType } from 'components/merchant/types'
import { ValueOf } from 'utils.type'

export const MERCHANT_PRODUCT_STATUS_DIC = {
	INIT:    'INIT',
	LOADING: 'LOADING',
	LOADED:  'LOADED',
	ERROR:   'ERROR',
} as const

interface MerchantProductState {
	status: ValueOf<typeof MERCHANT_PRODUCT_STATUS_DIC>
	products: MerchantProductType[]
}

const merchantProductSignal = signal<MerchantProductState>({
	status: MERCHANT_PRODUCT_STATUS_DIC.INIT,
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
		if (merchantProductSignal.value.status !== MERCHANT_PRODUCT_STATUS_DIC.INIT || requestInProgress) return;

		requestInProgress = true;
		merchantProductSignal.value = {
			...merchantProductSignal.value,
			status: MERCHANT_PRODUCT_STATUS_DIC.LOADING
		};

		sendRequest(API_ROUTE.merchantProducts)
			.then((products) => {
				merchantProductSignal.value = {
					status: MERCHANT_PRODUCT_STATUS_DIC.LOADED,
					products: products.data,
				};
			})
			.catch(() => {
				requestInProgress = false;
				merchantProductSignal.value = {
					status: MERCHANT_PRODUCT_STATUS_DIC.LOADED,
					products: [],
				};
			});
	}, [])

	return {
		get products() { return merchantProductSignal.value.products },
		get isProductLoaded() { return merchantProductSignal.value.status === MERCHANT_PRODUCT_STATUS_DIC.LOADED },
		get isProductEmpty() { return !merchantProductSignal.value.products.length },
	};
}
