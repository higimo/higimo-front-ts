import { FormValues } from 'components/merchant/merchant-payment-form/types'
import { InitOptions } from 'api-types/tinkoff'
import { MerchantProductType } from 'api-types/merchant.types'
import { UseFormGetValues } from 'react-hook-form'

import { loadJs } from 'utils/merchant/load-js'
import { sendRequest } from 'utils/api/send-request'

type GetInfoType = () => {
	currentProduct: MerchantProductType
	getValues: UseFormGetValues<FormValues>
}

export async function initPayment(getInfo: GetInfoType) {
	await loadJs('https://integrationjs.tbank.ru/integration.js')

	const initConfig: InitOptions = {
		terminalKey: '25872718',
		product: 'eacq',
		features: {
			payment: {
				// Куда встраивать кнопки
				container: document.getElementById('paymentContainer'),

				// config: {}

				/**
				 * Должен вызываться мой бекенд, с переданным orderId
				 * Бэк должен указывать цену, не передавать её фронтендом
				 *
				 * PaymentURL из ответа должен вернутся на фронтенд в paymentStartCallback
				 */
				paymentStartCallback: async (paymentType: string) => {
					const { currentProduct, getValues } = getInfo()
					const { email, comment } = getValues()

					try {
						type PaymentType = {
							payment_url: string
						}
						const { data } = await sendRequest<PaymentType>(
							'/api/v2/checkout',
							{
								method: 'POST',
								values: {
									offer_id: currentProduct.offers[0]?.id || null,
									payment_type: paymentType,
									comment: comment,
									email: email,
								}
							}
						)

						if ('payment_url' in data) {
							return data.payment_url
						}

						throw new Error('Бэкенд не вернул payment_url')
					} catch (error) {
						console.error('Ошибка при инициализации платежа:', error)
						throw error
					}
				},
			},
		},
	}

	await PaymentIntegration.init(initConfig)
}
