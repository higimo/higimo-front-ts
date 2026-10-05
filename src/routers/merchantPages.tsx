import { Route } from 'preact-iso'

import { DonationOfertaPage } from 'pages/merchant/donation-oferta-page'
import { MerchantPage } from 'pages/merchant/merchant-page'
import { PaymentOfertaPage } from 'pages/merchant/payment-oferta-page'
import { PaymentPage } from 'pages/merchant/payment-page'
import { PaymentPolicyPage } from 'pages/merchant/payment-policy-page'
import { PersonalPolicyPage } from 'pages/merchant/personal-policy-page'

import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'

// Магазин
export const merchantPages = [
	<Route path={ROUTE_LINKS.merchantIndex} component={MerchantPage} />,
	<Route path={ROUTE_LINKS.merchantCheckout} component={PaymentPage} />,
	<Route path={ROUTE_LINKS.merchantPaymentPolicy} component={PaymentPolicyPage} />,
	<Route path={ROUTE_LINKS.merchantPersonalPolicy} component={PersonalPolicyPage} />,
	<Route path={ROUTE_LINKS.merchantPaymentOferta} component={PaymentOfertaPage} />,
	<Route path={ROUTE_LINKS.merchantDonationOferta} component={DonationOfertaPage} />,
]
