import { ROUTE_LINK } from 'dic/route/ROUTE_LINK'

export const MERCHANT_LINK = [
	{ href: ROUTE_LINK.merchantPaymentPolicy, title: 'Порядок оплаты' },
	{ href: ROUTE_LINK.merchantPersonalPolicy, title: 'Политика обработки ПД' },
	{ href: ROUTE_LINK.merchantPaymentOferta, title: 'Оферта' },
	{ href: ROUTE_LINK.merchantDonationOferta, title: 'Донатная оферта' },
] as const
