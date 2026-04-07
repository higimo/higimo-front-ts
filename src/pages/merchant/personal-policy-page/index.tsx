import { FunctionComponent } from 'preact'

import { usePageTitle } from 'hook/use-page-title'

import { TextContainer } from 'components/ui/text-container'
import { Breadcrumps } from 'components/ui/breadcrumps'
import { PrivacyPersonal } from 'components/merchant/merchant-payment-personal'
import { MerchantPolicyNavigation } from 'components/merchant/merchant-policy-navigation'

export const PersonalPolicyPage: FunctionComponent = () => {
	usePageTitle('Политика обработки ПД')

	return (
		<TextContainer>
			<Breadcrumps />
			<MerchantPolicyNavigation />

			<PrivacyPersonal />
		</TextContainer>
	)
}
