import { FunctionComponent } from 'preact'
import { PageJSONData } from 'pages/resume/components/block-renderer/types'

import { useJsonApi } from 'hook/use-json-api'
import { usePageTitle } from 'hook/use-page-title'

import { BlockRenderer } from 'pages/resume/components/block-renderer/BlockRenderer'
import { Breadcrumps } from 'components/ui/breadcrumps'
import { Loading } from 'components/ui/loading'
import { MerchantCredits } from 'components/merchant/merchant-credits'
import { MerchantPolicyNavigation } from 'components/merchant/merchant-policy-navigation'
import { TextContainer } from 'components/ui/text-container'

import '../merchant-style.css'

export const DonationOfertaPage: FunctionComponent = () => {
	usePageTitle('Донатная оферта')

	const data = useJsonApi<PageJSONData>('/json/merchant/donation-policy.json')

	if (data === null) {
		return <Loading />
	}

	return (
		<div className="merchant-text-page">
			<TextContainer>
				<Breadcrumps />
				<MerchantPolicyNavigation />
			</TextContainer>

			{data.blocks.map((block, idx) => (
				<BlockRenderer key={idx} block={block} />
			))}

			<TextContainer>
				<MerchantCredits />
			</TextContainer>
		</div>
	)
}
