import { FunctionComponent } from 'preact'
import { PageJSONData } from 'components/block-renderer/types'

import { useJsonApi } from 'hook/fetch/use-json-api'

import { BlockRenderer } from 'components/block-renderer/BlockRenderer'
import { Breadcrumps } from 'components/ui/breadcrumps'
import { EmptyData } from 'components/ui/empty-data'
import { Layout } from 'components/ui/layout/Layout'
import { LoadSuspense } from 'components/ui/load-suspense'
import { MerchantPolicyNavigation } from 'components/merchant/merchant-policy-navigation'
import { TextContainer } from 'components/ui/text-container'

import '../merchant-style.css'

export const PaymentPolicyPage: FunctionComponent = () => {
	const [ blockListJsonData ] = useJsonApi<PageJSONData>('/json/merchant/payment-personal.json')

	return (
		<Layout title="Порядок оплаты" className="merchant-text-page">
			<TextContainer>
				<Breadcrumps />
				<MerchantPolicyNavigation />
			</TextContainer>

			<LoadSuspense data={blockListJsonData}>
				<EmptyData data={blockListJsonData}>
					{blockListJsonData.data && blockListJsonData.data.blocks.map((block, idx) => (
						<BlockRenderer key={idx} block={block} />
					))}
				</EmptyData>
			</LoadSuspense>
		</Layout>
	)
}
