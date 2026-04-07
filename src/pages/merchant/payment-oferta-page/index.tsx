import { FunctionComponent } from 'preact'

import { usePageTitle } from 'hook/use-page-title'

import { TextContainer } from 'components/ui/text-container'
import { Breadcrumps } from 'components/ui/breadcrumps'
import { MerchantOferta } from 'components/merchant/merchant-oferta'
import { MerchantPolicyNavigation } from 'components/merchant/merchant-policy-navigation'

export const PaymentOfertaPage: FunctionComponent = () => {
	usePageTitle('Офорта')

	return (
		<TextContainer>
			<Breadcrumps />
			<MerchantPolicyNavigation />

			<MerchantOferta />
		</TextContainer>
	)
}
