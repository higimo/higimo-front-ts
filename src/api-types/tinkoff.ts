type IframeIntegrationConfig = any
type OverlayType = any
type PaymentStartCallback = (paymentType: OverlayType) => Promise<string>


/**
 * Тиньков эквайринг
 * https://developer.tbank.ru/eacq/intro/developer/setup_js/
 */

export interface IntegrationInitConfig {
	terminalKey: string
	product: 'eacq'
	features: {
		addcardIframe?: {
			container?: HTMLElement | null
			config?: IframeIntegrationConfig
			paymentStartCallback?: PaymentStartCallback
		}
		iframe?: {
			container?: HTMLElement | null
			config?: IframeIntegrationConfig
			paymentStartCallback?: PaymentStartCallback
		}
		payment?: {
			container?: HTMLElement | null
			config?: PaymentIntegrationConfig
			paymentStartCallback?: PaymentStartCallback
		}
	}
}


declare global {
	interface Window {
		PaymentIntegration: PaymentIntegrationStatic
		PAYMENT_INTEGRATION_CONFIG?: PaymentIntegrationConfig
		PAYMENT_INTEGRATION_BASE_URL?: string
	}

	const PaymentIntegration: PaymentIntegrationStatic
}

export interface PaymentIntegrationStatic {
	init: (options: InitOptions) => Promise<IntegrationInstance>
	getUrl: (version?: string) => string
}

export interface InitOptions {
	/** Терминальный ключ (обязательный) */
	terminalKey: string

	/** Продукт интеграции (обязательный, должен быть из списка допустимых) */
	product: 'eacq' | 'tinkoffjs'

	/** Дополнительные опции (не документированы в исходниках, но могут быть) */
	[key: string]: unknown
}

export interface IntegrationInstance {
	/** Инициализация с переданными опциями */
	init: (options: InitOptions) => Promise<IntegrationInstance>

	/** Другие методы (не видны из минифицированного кода, но вероятно есть) */
	openPayment?: (options: PaymentOpenOptions) => Promise<void>
	closePayment?: () => void
	on?: (event: string, callback: (data: unknown) => void) => void
	off?: (event: string, callback: (data: unknown) => void) => void
}

export interface PaymentIntegrationConfig {
	/** Настройки терминала */
	terminalSettings: TerminalSettings

	/** Терминальный ключ */
	terminalKey: string

	/** Используемая версия бакета (a, b, c, next, current) */
	bucket: 'a' | 'b' | 'c' | 'next' | 'current'

	/** Продукт */
	product: 'eacq' | 'tinkoffjs'

	/** Версия загрузчика */
	loaderVersion: string

	/** Флаг устаревшего браузера (нет Array.prototype.at) */
	isOutdated: boolean

	/** URL-ы API */
	urls: UrlsConfig
}

export interface PaymentIntegrationConfig {
	/**
	 * Срабатывает после загрузки кнопок оплаты (перед отображением)
	 * Может быть использован для отображения loader в контейнере
	 */
	loadedCallback?: () => void

	/**
	 * Возможность переопределить значение z-index оверлея
	 */
	zIndex?: number
	scroll?: {
		/**
		 * Основной элемент страницы с включенным overflow
		 * Используется для блокировки скролла во время отображения оверлея
		 * Значение по умолчанию — document.body
		 */
		elementForBlocking?: HTMLElement
	}
	router?: {
		/**
		 * Вызывается в момент получения события на открытие deepLink
		 * Стандартное значение — (url) => {window.location.href = url}
		 * @param url
		 */
		deepLinkRedirectCallback?: (url: string) => Promise<void>

		/**
		 * Вызывается в момент получения события на открытие массива deepLink.
		 * Требуется для перебора разных приложений, например для sberpay
		 * Стандартное значение: (links, script) => {
		 *  window.location.href = script
		 * }
		 * @param links - массив deepLink
		 * @param script - url скрипта перебора deepLink
		 */
		deepLinksRedirectCallback?: (links: string[], script: string) => Promise<void>

		/**
		 * Вызывается в момент получения события на редирект
		 * Стандартное значение — (url) => {window.location.href = url}
		 * @param url
		 */
		redirectCallback?: (url: string) => Promise<void>
	}

	dialog?: {
		/**
		 * Вызывается в момент получения события exit — пользователь отменил оплату. Например, при нажатии кнопки «Вернуться в магазин» или закрытии модального окна
		 * @param url
		 */
		closedCallback?: () => Promise<void>
	}

	status?: {
		/**
		 * Флаг открытия overlay при смене статуса
		 * Если в процессе оплаты диалог оплаты был закрыт, но произошла смена статуса
		 * При значении флага true — откроется диалог и отобразится статус платежа
		 * Стандартное значение — true
		 */
		openOverlay?: boolean

		/**
		 * Вызывается в момент изменения статуса платежа
		 * @param status
		 */
		changedCallback?: (status: PaymentIntegrationStatus) => Promise<void>
	}

	payment?: {
		/**
		 * Вызывается в момент получения ошибки в paymentStartCallback во время инициализации платежа
		 */
		failedPaymentStartCallback?: (error: Error) => Promise<void>
	}

	alert?: {
		/**
		 * Используется для показа алертов при ошибках
		 * Если ошибок нет, используются стандартные алерты
		 * @param alert
		 */
		showAlertCallback?: (alert: AlertInfo) => Promise<void>
	}
}
type AlertInfo = any

export type PaymentIntegrationStatus = 'CANCELED' |
	'EXPIRED' |
	'NEW' |
	'PROCESSING_ERROR' |
	'PROCESSING' |
	'REFUNDED' |
	'REJECTED' |
	'SUCCESS'

export interface TerminalSettings {
	/** Включенные платежные методы */
	payMethods?: PaymentMethod[]

	/** Включенные toggle-и */
	admToggle?: string[]

	/** Включенные toggle-и для PF */
	pfToggle?: string[]

	/** Кастомизация */
	customization?: Record<string, unknown>

	/** Бакетинг (A/B тестирование) */
	bucket?: BucketConfig

	/** Типы платежей (преобразованные из payMethods) */
	paymentTypes?: PaymentType[]
}


export type PaymentType = 'alfapay' |
	'bnpl' |
	'card' |
	'digitalruble' |
	'tcb' |
	'mirpay' |
	'sberpay' |
	'sbp' |
	'tpay'



export type PaymentMethod = 'AlfaPay' |
	'Bnpl' |
	'cards' |
	'DigitalRuble' |
	'Installment' |
	'MirPay' |
	'SberPay' |
	'SBP' |
	'TinkoffPay'



export interface BucketConfig {
	/** Тип используемого бакета */
	bucketType?: 'current' | 'next' | 'a' | 'b' | 'c'

	/** Версии для разных бакетов */
	buckets?: {
		current?: string
		next?: string
		a?: string
		b?: string
		c?: string
	}
}

export interface UrlsConfig {
	/** URL для MAPI (Merchant API) */
	mapi: string

	/** URL для BFF (Backend For Frontend) */
	bff: string

	/** URL-ы, которые игнорируются при редиректе */
	ignoredRedirectUrls: string[]
}


export interface PaymentOpenOptions {
	/** Сумма платежа */
	amount?: number

	/** ID заказа */
	orderId?: string

	/** Описание заказа */
	description?: string

	/** Данные клиента */
	customer?: {
		email?: string
		phone?: string
		name?: string
	}

	/** Дополнительные параметры */
	[key: string]: unknown
}


export interface PaymentSuccessData {
	/** ID заказа */
	orderId: string

	/** ID платежа */
	paymentId: string

	/** Статус */
	status: 'success'

	/** Сумма */
	amount: number
}


export interface PaymentError {
	/** Код ошибки */
	code: string

	/** Сообщение об ошибке */
	message: string

	/** Детали ошибки */
	details?: Record<string, unknown>
}

export const isPaymentIntegrationLoaded = (
	obj: unknown
): obj is PaymentIntegrationStatic => {
	return (
		typeof obj === 'object' &&
		obj !== null &&
		'init' in obj &&
		typeof (obj as any).init === 'function' &&
		'getUrl' in obj &&
		typeof (obj as any).getUrl === 'function'
	)
}


export const isIntegrationInstance = (
	obj: unknown
): obj is IntegrationInstance => {
	return (
		typeof obj === 'object' &&
		obj !== null &&
		'init' in obj &&
		typeof (obj as any).init === 'function'
	)
}
