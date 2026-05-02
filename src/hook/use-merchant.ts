import { useEffect, useCallback, useReducer } from 'preact/hooks'
import { useLocation } from 'preact-iso'

import sendRequest from 'utils/send-request'

import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'
import { API_ROUTE } from 'dic/api-route'

import { signal } from '@preact/signals';
import { KeyOf, ValueOf } from 'utils.type'
import { MerchantProductType } from 'components/merchant/types'

export const MERCHANT_PRODUCT_STATUS_DIC = {
	INIT:    'INIT',
	LOADING: 'LOADING',
	LOADED:  'LOADED',
	ERROR:   'ERROR',
} as const

interface MerchantProductState {
	status: ValueOf<typeof MERCHANT_PRODUCT_STATUS_DIC> // TODO: [MEDIUM] применить по остальному проекту
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
					products,
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
