import { Route } from 'preact-iso'

import { DonationOfertaPage } from 'pages/merchant/donation-oferta-page'
import { MerchantPage } from 'pages/merchant/merchant-page'
import { PaymentOfertaPage } from 'pages/merchant/payment-oferta-page'
import { PaymentProductPage } from 'pages/merchant/payment-product-page'
import { PaymentPolicyPage } from 'pages/merchant/payment-policy-page'
import { PersonalPolicyPage } from 'pages/merchant/personal-policy-page'

import { ROUTE_LINK } from 'dic/route/ROUTE_LINK'

// Магазин
export const merchantPages = [
	<Route path={ROUTE_LINK.merchantIndex} component={MerchantPage} />,
	<Route path={ROUTE_LINK.merchantCheckout} component={PaymentProductPage} />,
	<Route path={ROUTE_LINK.merchantPaymentPolicy} component={PaymentPolicyPage} />,
	<Route path={ROUTE_LINK.merchantPersonalPolicy} component={PersonalPolicyPage} />,
	<Route path={ROUTE_LINK.merchantPaymentOferta} component={PaymentOfertaPage} />,
	<Route path={ROUTE_LINK.merchantDonationOferta} component={DonationOfertaPage} />,
]
