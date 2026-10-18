import { FormValues } from 'components/merchant/merchant-payment-form'
import { FunctionComponent } from 'preact'
import { MerchantProductType } from 'api-types/merchant.types'
import { UseFormGetValues } from 'react-hook-form'

import { useSdkLoader } from 'hook/use-sdk-loader'

import { injectScript } from 'utils/sdk/inject-script'
import { sendRequest } from 'utils/api/send-request'

import {
	setTbankError,
	setTbankLoaded,
	setTbankLoading,
} from 'context/tbank-signal'

import { TBANK_SCRIPT_SRC } from 'config/TBANK-SCRIPT-SRC'
import { TBANK_TERMINAL_KEY } from 'config/TBANK-TERMINAL'

type TbankSdkLoaderPropsType = {
	currentProduct: MerchantProductType
	getValues: UseFormGetValues<FormValues>
}

export const TbankSdkLoader: FunctionComponent<TbankSdkLoaderPropsType> = ({
	currentProduct,
	getValues,
}) => {
	useSdkLoader<true>({
		ready: () => {
			if (window.PaymentIntegration) {
				return { ready: true, data: true }
			}
			return { ready: false }
		},
		load: () => injectScript(TBANK_SCRIPT_SRC),
		init: () => PaymentIntegration.init({
			terminalKey: TBANK_TERMINAL_KEY,
			product: 'eacq',
			features: {
				payment: {
					container: document.getElementById('paymentContainer'),
					paymentStartCallback: async (paymentType: string) => {
						const { email, comment } = getValues()

						const { data } = await sendRequest<{ payment_url: string }>(
							'/api/v2/checkout',
							{
								method: 'POST',
								values: {
									offer_id: currentProduct.offers[0]?.id || null,
									payment_type: paymentType,
									comment,
									email,
								},
							}
						)

						if ('payment_url' in data) {
							return data.payment_url
						}

						throw new Error('Бэкенд не вернул payment_url')
					},
				},
			},
		}).then(() => true),
		onLoading: setTbankLoading,
		onLoaded: () => setTbankLoaded(),
		onError: setTbankError,
	})

	return null
}
