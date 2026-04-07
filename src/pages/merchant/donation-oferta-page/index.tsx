import { FunctionComponent } from 'preact'

import { usePageTitle } from 'hook/use-page-title'

import { TextContainer } from 'components/ui/text-container'
import { Breadcrumps } from 'components/ui/breadcrumps'
import { MerchantDonationPrivacy } from 'components/merchant/merchant-donation-policy'
import { MerchantPolicyNavigation } from 'components/merchant/merchant-policy-navigation'

export const DonationOfertaPage: FunctionComponent = () => {
	usePageTitle('Донатная оферта')

	return (
		<TextContainer>
			<Breadcrumps />
			<MerchantPolicyNavigation />

			<MerchantDonationPrivacy />
		</TextContainer>
	)
}
