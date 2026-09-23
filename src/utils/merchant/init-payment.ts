import { InitOptions } from 'api-types/tinkoff'
import { UseFormGetValues } from 'react-hook-form'

import { sendRequest } from 'utils/api/send-request'

import { MerchantProductType } from 'api-types/merchant.types'
import { FormValues } from 'components/merchant/merchant-payment-form/types'
import { loadJs } from 'utils/merchant/load-js'

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
						const { data } = await sendRequest(
							'/api/v2/checkout',
							{
								method: 'POST',
								values: {
									offer_id: currentProduct.offers[0]?.id,
									payment_type: paymentType,
									comment: comment,
									email: email,
								}
							}
						)

						if (!data.payment_url) {
							throw new Error('Бэкенд не вернул payment_url')
						}

						return data.payment_url
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


