import { FunctionComponent } from 'preact'

import { usePageTitle } from 'hook/use-page-title'

import { TextContainer } from 'components/ui/text-container'
import { Breadcrumps } from 'components/ui/breadcrumps'
import { MerchantPayment } from 'components/merchant/merchant-payment'
import { MerchantPaymentPolicy } from 'components/merchant/merchant-privacy-policy'
import { MerchantPolicyNavigation } from 'components/merchant/merchant-policy-navigation'

export const PaymentPolicyPage: FunctionComponent = () => {
	usePageTitle('Порядок оплаты')

	return (
		<TextContainer>
			<Breadcrumps />
			<MerchantPolicyNavigation />

			<MerchantPayment />
			<MerchantPaymentPolicy />
		</TextContainer>
	)
}
