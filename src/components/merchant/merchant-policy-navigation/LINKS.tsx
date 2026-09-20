import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'

export const LINKS = [
	{ href: ROUTE_LINKS.merchantPaymentPolicy, title: 'Порядок оплаты' },
	{ href: ROUTE_LINKS.merchantPersonalPolicy, title: 'Политика обработки ПД' },
	{ href: ROUTE_LINKS.merchantPaymentOferta, title: 'Оферта' },
	{ href: ROUTE_LINKS.merchantDonationOferta, title: 'Донатная оферта' },
] as const
