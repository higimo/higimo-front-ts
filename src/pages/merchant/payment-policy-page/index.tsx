import { FunctionComponent } from 'preact'
import { PageJSONData } from 'components/block-renderer/types'

import { useJsonApi } from 'hook/fetch/use-json-api'
import { usePageTitle } from 'hook/use-page-title'

import { BlockRenderer } from 'components/block-renderer/BlockRenderer'
import { Breadcrumps } from 'components/ui/breadcrumps'
import { Loading } from 'components/ui/loading'
import { MerchantPolicyNavigation } from 'components/merchant/merchant-policy-navigation'
import { TextContainer } from 'components/ui/text-container'

import '../merchant-style.css'

export const PaymentPolicyPage: FunctionComponent = () => {
	usePageTitle('Порядок оплаты')

	const data = useJsonApi<PageJSONData>('/json/merchant/payment-personal.json')

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
		</div>
	)
}
