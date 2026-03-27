import { FunctionComponent } from 'preact'

import { usePageTitle } from 'hook/use-page-title'

import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'
import { useLayoutEffect } from 'preact/hooks'
import { InitOptions } from 'types';

import './style.css'

// https://developer.tbank.ru/eacq/intro/developer/setup_js/
async function loadJs(url) {
	return new Promise((resolve, reject) => {
		const element = document.createElement('script');
		element.src = url;
		element.type = 'text/javascript';
		element.async = true;
		// @ts-ignore
		element.onload = () => resolve();
		element.onerror = () => reject();

		document.body.appendChild(element);
	});
}

async function initPayment() {
	await loadJs('https://integrationjs.tbank.ru/integration.js');

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
				paymentStartCallback: async (paymentType) => {

					console.log('Выбран способ оплаты:', paymentType);


					// const res = await new PaymentIntegration.Helpers().request(URL, 'POST', INIT_PARAMS); // URL — это URL вашего бэкенда, который вызовет метод «Инициировать платеж»
					// return res.PaymentURL;


					try {
						// Вызываем ваш бэкенд
						const response = await fetch('/api/v2/payment', {
							method: 'POST',
							headers: {
								'Content-Type': 'application/json',
							},
							body: JSON.stringify({
								amount: 1000,
								orderId: `ORDER_${Date.now()}`,
								description: 'Оплата заказа',
								paymentType: paymentType,
								customerEmail: 'customer@example.com',
								customerPhone: '+79991234567',
							}),
						});

						if (!response.ok) {
							throw new Error(`HTTP ${response.status}: ${response.statusText}`);
						}

						const data = await response.json();
						console.log('Ответ бэкенда:', data);

						// Бэкенд должен вернуть поле paymentUrl
						if (!data.paymentUrl) {
							throw new Error('Бэкенд не вернул paymentUrl');
						}

						return data.paymentUrl;
					} catch (error) {
						console.error('Ошибка при инициализации платежа:', error);
						throw error; // Пробрасываем ошибку дальше
					}
				},
			},
		},
	};

	const integration = await PaymentIntegration.init(initConfig);

	console.log('Интеграция готова:', integration);
}

export const PaymentPage: FunctionComponent = () => {
	usePageTitle('Страница оплаты')

	useLayoutEffect(() => {
		initPayment()
			.then()
			.catch()
	}, [])

	return (
		<div className="payment-page">
			<div id="paymentContainer" />
			<p>
				<a href={ROUTE_LINKS.index}>Главная</a>
			</p>
		</div>
	)
}
