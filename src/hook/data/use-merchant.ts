import { setMerchantError } from 'context/merchant-signal'
import { MerchantProductType } from 'api-types/merchant.types'

import { useEffect } from 'preact/hooks'

import { sendRequest } from 'utils/api/send-request'
import { setMerchantLoaded, setMerchantLoading } from 'context/merchant-signal'

import { merchantProductSignal } from 'context/merchant-signal'

import { API_ROUTE } from 'dic/route/API_ROUTE'
import { API_STATUS } from 'dic/API_STATUS'
import { ApiState } from 'api-types/fetch-api.types'

/**
 * Загружает товары магазина
 * При повторном монтировании данные не перезагружает
 */
export const useMerchant = (): ApiState<MerchantProductType[], Object> => {
	useEffect(() => {
		if (merchantProductSignal.value.status !== API_STATUS.INIT) {
			return
		}

		setMerchantLoading()

		sendRequest<MerchantProductType[]>(API_ROUTE.merchantProducts)
			.then(({ data }) => {
				setMerchantLoaded(data)
			})
			.catch((error: Error) => {
				setMerchantError(error)
			})
	}, [])

	return merchantProductSignal.value
}
