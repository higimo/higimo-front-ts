// TODO: перенести в src/api-types
export type HigimoServerResponse = any[]

export type AccordType = {
	id: number
	name: string
	code: string
	text: string
	view: number
}

export type AccordModeType = AccordType & {
	isNew: boolean
	isMostView: boolean
}

export type CinemaType = {
	id: number
	title: string
	code: string
	text: string
}

export type DemagogType = {
	id: number
	name: string
	description: string
}

export type FaqType = {
	id: number
	name: string
	code: string
	text: string
}

export type YaMapType = {
	id: string
	name: string
	code: string
	map: string
}

export type LinksType = {
	id: number
	url: string
	description: string
}

export type ListPropertyType = {
	id: number
	item_id: number
	property_id: number
	value: string
	property: {
		id: number
		item_id: number
		name: string
		type: string
	}
}

export type ListerItem = {
	id: number
	parent_id: number
	title: string
	code: string
	created_at: number
	children?: ListerItem[];
	parent?: ListerItem;
	values?: ListPropertyType[];
}

export type ListerProperty = {
	id: number
	name: string
	type: string
	item: number
}

export type ListerValue = {
	id: number
	value: string
	property: number
	item: number
}

export type ListListType = ListerItem & {
	child?: ListerItem[]
}

/**
 * =========================================
 * Нокиа
 * =========================================
 */

export type NokiaTagGroupType = string

export type NokiaTagType = {
	id: number
	name: string
	group: NokiaTagGroupType
}
export type NokiaPersonApiType = {
	id: number
	name: string
	alias: string
	nick: string
	description: string
}
export type NokiaPersonType = NokiaPersonApiType & {
	tags: NokiaTagType[]
}
export type NokiaMeetingApiType = {
	id: number,
	/** 'meeting' 'tg' 'offline' */
	type: string
	/** unixtime / 1000 */
	date: number // TODO: заменить на бэке на date
	/** "2024-01-15T10:00:00Z" */
	date_start: string
	/** "2024-01-15T10:00:00Z" */
	date_end: string
	description: string
}
export type NokiaRichMeetingType = NokiaMeetingApiType & {
	person: NokiaPersonType[]
}
export type NokiaNoteType = {
    id: number
    text: string
    person_id: number
}
// TODO: надо исправить см. NokiaMeetingApiType
export type NokiaMeetingWithPersonType = NokiaMeetingApiType & {
    person: NokiaPersonApiType[]
}
// TODO: надо исправить
export type NokiaPersonFullType = {
	id: number
	name: string
	alias: string
	nick: string
	description: string
	tags: NokiaTagType[]
    notes: NokiaNoteType[]
    meetings: NokiaMeetingWithPersonType[]
}
export type NokiaMeetingStatisticType = {
    id: number
    date: number
    type: string
}

/**
 * ===================================
 *             Пинарик
 * ===================================
 */

export type PinarikType = {
	id: number,
	date: string // 2020-05-14
	score: number,
	description: string
}


/**
 * ===================================
 *             Лекции
 * ===================================
 */

export type LectionType = {
	id: number
	name: string
	code: string
	text: string
}


/**
 * ===================================
 *             Портфолио
 * ===================================
 */

export type PortfolioIdsType = {
	id: number
	vendor: number
	code: string
}
export type PortfolioTag = {
	id: number
	title: string
}
export type PortfolioGroupTagType = {
	id: number
	title: string
}
export type PortfolioGroupedTagType = {
	group: PortfolioGroupTagType
	tags: PortfolioTag[]
}
export type PortfolioWorkerType = {
	id: number,
	full_name: string
	login: string
	company: string
	image: null
	role: string
	link?: string
}
export type PortfolioCreditsType = {
	role: string
	worker: PortfolioWorkerType
}
export type PortfolioVendorType = {
	id: number
	code: string
	title: string
	description?: string
}
// TODO: бекенд Вот бы добавить следующий и предыдущий кейс

export type PortfolioProjectApiType = {
	id: number
	vendor_id: number
	vendor: PortfolioVendorType
	name: string
	code: string
	date: string // yyy-mm-dd
	image: 'png' | 'jpg'
	cover_size: 'high' | 'big' | 'normal' | 'small'
	isLink: boolean
	link?: string
}
// TODO: отделить тип для сингл страницы от остальных
export type PortfolioProjectType = PortfolioProjectApiType & {
	tags: PortfolioTag[]
	credits?: PortfolioCreditsType[]
	description?: string
	text?: string
}





export type PetProjectType = {
	name: string
	description: string
	priority: number
}

export type YoutubeType = {
	code: string
	name: string
}

export type VKAlbumSizesType = {
	type: 'x' | 's'
	src: string
}

export type VKAlbumType = {
	id: string
	privacy_view: {
		type: 'all' | 'private'
	}
	title: string
	size: string
	description: string
	sizes: VKAlbumSizesType[]
}

export type VkPhotoOrigType = {
	height: number,
	width: number
	type: 'base',
	url: string
}

export type VkPhotoSizesType = {
	height: number
	width: number
	type: 'm' | 'o' | 'p' | 'q' | 'r' | 's' | 'w' | 'x' | 'y' | 'z'
	url: string
}

export type VkPhotoType = {
	album_id: number,
	date: number, // timestamp
	id: number,
	owner_id: number, // user_id
	sizes: VkPhotoSizesType[]
	text: string
	web_view_token: string
	has_tags: boolean
	orig_photo: VkPhotoOrigType
}

export type VkAlbumType = {
	id: number // album id
	owner_id: number // userId
	size: number // count photos
	title: string // Название альбома
	feed_disabled: number // bool? вижу 0
	feed_has_pinned: number // bool? вижу 0
	created: number, // timestamp
	description: string,
	can_delete: boolean,
	can_include_to_feed: boolean,
	is_locked: boolean,
	privacy_comment: {
		category: 'all',
		lists: {
			allowed: [],
			excluded: []
		},
		owners: {
			allowed: [],
			excluded: []
		}
	},
	privacy_view: {
		category: string // 'only_me',
		lists: {
			allowed: [],
			excluded: []
		},
		owners: {
			allowed: [],
			excluded: []
		}
	},
	sizes: VkPhotoSizesType[]
	thumb_id: number,
	thumb_is_last: number, // bool? вижу 1
	updated: number // timestamp
}

export type ComojiType = {
	id: number
	comoji: string
}

export type TableGameType = {
	id: number
	name: string
	text: string
}








type IframeIntegrationConfig = any
type OverlayType = any
type PaymentStartCallback = (paymentType: OverlayType) => Promise<string>

/**
 * Тиньков эквайринг
 * https://developer.tbank.ru/eacq/intro/developer/setup_js/
 */

export interface IntegrationInitConfig {
	terminalKey: string;
	product: 'eacq';
	features:  {
		addcardIframe?: {
			container?: HTMLElement | null;
			config?: IframeIntegrationConfig;
			paymentStartCallback?: PaymentStartCallback;
		};
		iframe?: {
			container?: HTMLElement | null;
			config?: IframeIntegrationConfig;
			paymentStartCallback?: PaymentStartCallback;
		};
		payment?: {
			container?: HTMLElement | null;
			config?: PaymentIntegrationConfig;
			paymentStartCallback?: PaymentStartCallback;
		};
	};
}


declare global {
	interface Window {
		PaymentIntegration: PaymentIntegrationStatic;
		PAYMENT_INTEGRATION_CONFIG?: PaymentIntegrationConfig;
		PAYMENT_INTEGRATION_BASE_URL?: string;
	}

	const PaymentIntegration: PaymentIntegrationStatic;
}

export interface PaymentIntegrationStatic {
	init: (options: InitOptions) => Promise<IntegrationInstance>;
	getUrl: (version?: string) => string;
}

export interface InitOptions {
	/** Терминальный ключ (обязательный) */
	terminalKey: string;

	/** Продукт интеграции (обязательный, должен быть из списка допустимых) */
	product: 'eacq' | 'tinkoffjs';

	/** Дополнительные опции (не документированы в исходниках, но могут быть) */
	[key: string]: unknown;
}

export interface IntegrationInstance {
	/** Инициализация с переданными опциями */
	init: (options: InitOptions) => Promise<IntegrationInstance>;

	/** Другие методы (не видны из минифицированного кода, но вероятно есть) */
	openPayment?: (options: PaymentOpenOptions) => Promise<void>;
	closePayment?: () => void;
	on?: (event: string, callback: (data: unknown) => void) => void;
	off?: (event: string, callback: (data: unknown) => void) => void;
}

export interface PaymentIntegrationConfig {
	/** Настройки терминала */
	terminalSettings: TerminalSettings;

	/** Терминальный ключ */
	terminalKey: string;

	/** Используемая версия бакета (a, b, c, next, current) */
	bucket: 'a' | 'b' | 'c' | 'next' | 'current';

	/** Продукт */
	product: 'eacq' | 'tinkoffjs';

	/** Версия загрузчика */
	loaderVersion: string;

	/** Флаг устаревшего браузера (нет Array.prototype.at) */
	isOutdated: boolean;

	/** URL-ы API */
	urls: UrlsConfig;
}

export interface PaymentIntegrationConfig {
	/**
	 * Срабатывает после загрузки кнопок оплаты (перед отображением)
	 * Может быть использован для отображения loader в контейнере
	 */
	loadedCallback?: () => void;

	/**
	 * Возможность переопределить значение z-index оверлея
	 */
	zIndex?: number;
	scroll?: {
		/**
		 * Основной элемент страницы с включенным overflow
		 * Используется для блокировки скролла во время отображения оверлея
		 * Значение по умолчанию — document.body
		 */
		elementForBlocking?: HTMLElement;
	};
	router?: {
		/**
		 * Вызывается в момент получения события на открытие deepLink
		 * Стандартное значение — (url) => {window.location.href = url}
		 * @param url
		 */
		deepLinkRedirectCallback?: (url: string) => Promise<void>;

		/**
		 * Вызывается в момент получения события на открытие массива deepLink.
		 * Требуется для перебора разных приложений, например для sberpay
		 * Стандартное значение: (links, script) => {
		 *  window.location.href = script;
		 * }
		 * @param links - массив deepLink
		 * @param script - url скрипта перебора deepLink
		 */
		deepLinksRedirectCallback?: (links: string[], script: string) => Promise<void>;

		/**
		 * Вызывается в момент получения события на редирект
		 * Стандартное значение — (url) => {window.location.href = url}
		 * @param url
		 */
		redirectCallback?: (url: string) => Promise<void>;
	};

	dialog?: {
		/**
		 * Вызывается в момент получения события exit — пользователь отменил оплату. Например, при нажатии кнопки «Вернуться в магазин» или закрытии модального окна
		 * @param url
		 */
		closedCallback?: () => Promise<void>;
	};

	status?: {
		/**
		 * Флаг открытия overlay при смене статуса
		 * Если в процессе оплаты диалог оплаты был закрыт, но произошла смена статуса
		 * При значении флага true — откроется диалог и отобразится статус платежа
		 * Стандартное значение — true
		 */
		openOverlay?: boolean;

		/**
		 * Вызывается в момент изменения статуса платежа
		 * @param status
		 */
		changedCallback?: (status: PaymentIntegrationStatus) => Promise<void>;
	};

	payment?: {
		/**
		 * Вызывается в момент получения ошибки в paymentStartCallback во время инициализации платежа
		 */
		failedPaymentStartCallback?: (error: Error) => Promise<void>;
	};

	alert?: {
		/**
		 * Используется для показа алертов при ошибках
		 * Если ошибок нет, используются стандартные алерты
		 * @param alert
		 */
		showAlertCallback?: (alert: AlertInfo) => Promise<void>;
	};
}

type AlertInfo = any

export type PaymentIntegrationStatus =
	| 'CANCELED'
	| 'EXPIRED'
	| 'NEW'
	| 'PROCESSING_ERROR'
	| 'PROCESSING'
	| 'REFUNDED'
	| 'REJECTED'
	| 'SUCCESS'

export interface TerminalSettings {
	/** Включенные платежные методы */
	payMethods?: PaymentMethod[];

	/** Включенные toggle-и */
	admToggle?: string[];

	/** Включенные toggle-и для PF */
	pfToggle?: string[];

	/** Кастомизация */
	customization?: Record<string, unknown>;

	/** Бакетинг (A/B тестирование) */
	bucket?: BucketConfig;

	/** Типы платежей (преобразованные из payMethods) */
	paymentTypes?: PaymentType[];
}


export type PaymentType =
	| 'alfapay'
	| 'bnpl'
	| 'card'
	| 'digitalruble'
	| 'tcb'
	| 'mirpay'
	| 'sberpay'
	| 'sbp'
	| 'tpay';



export type PaymentMethod =
	| 'AlfaPay'
	| 'Bnpl'
	| 'cards'
	| 'DigitalRuble'
	| 'Installment'
	| 'MirPay'
	| 'SberPay'
	| 'SBP'
	| 'TinkoffPay';



export interface BucketConfig {
	/** Тип используемого бакета */
	bucketType?: 'current' | 'next' | 'a' | 'b' | 'c';

	/** Версии для разных бакетов */
	buckets?: {
		current?: string;
		next?: string;
		a?: string;
		b?: string;
		c?: string;
	};
}

export interface UrlsConfig {
	/** URL для MAPI (Merchant API) */
	mapi: string;

	/** URL для BFF (Backend For Frontend) */
	bff: string;

	/** URL-ы, которые игнорируются при редиректе */
	ignoredRedirectUrls: string[];
}


export interface PaymentOpenOptions {
	/** Сумма платежа */
	amount?: number;

	/** ID заказа */
	orderId?: string;

	/** Описание заказа */
	description?: string;

	/** Данные клиента */
	customer?: {
		email?: string;
		phone?: string;
		name?: string;
	};

	/** Дополнительные параметры */
	[key: string]: unknown;
}


export interface PaymentSuccessData {
	/** ID заказа */
	orderId: string;

	/** ID платежа */
	paymentId: string;

	/** Статус */
	status: 'success';

	/** Сумма */
	amount: number;
}


export interface PaymentError {
	/** Код ошибки */
	code: string;

	/** Сообщение об ошибке */
	message: string;

	/** Детали ошибки */
	details?: Record<string, unknown>;
}


interface VersionInfo {
	currentVersion: string;
	nextVersion: string;
	aVersion: string;
	bVersion: string;
	cVersion: string;
	bucketToUse: 'current' | 'next' | 'a' | 'b' | 'c';
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
	);
};


export const isIntegrationInstance = (
	obj: unknown
): obj is IntegrationInstance => {
	return (
		typeof obj === 'object' &&
		obj !== null &&
		'init' in obj &&
		typeof (obj as any).init === 'function'
	);
};
