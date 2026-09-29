import { FunctionComponent } from 'preact'
import { PageJSONData } from 'components/block-renderer/types'

import { useJsonApi } from 'hook/fetch/use-json-api'

import { BlockRenderer } from 'components/block-renderer/BlockRenderer'
import { Breadcrumps } from 'components/ui/breadcrumps'
import { EmptyData } from 'components/ui/empty-data'
import { Layout } from 'components/ui/layout/Layout'
import { LoadSuspense } from 'components/ui/load-suspense'
import { MerchantCredits } from 'components/merchant/merchant-credits'
import { MerchantPolicyNavigation } from 'components/merchant/merchant-policy-navigation'
import { TextContainer } from 'components/ui/text-container'

import '../merchant-style.css'

export const PaymentOfertaPage: FunctionComponent = () => {
	const [ data ] = useJsonApi<PageJSONData>('/json/merchant/merchant-oferta.json')

	return (
		<Layout title="Оферта" className="merchant-text-page">
			<TextContainer>
				<Breadcrumps />
				<MerchantPolicyNavigation />
			</TextContainer>

			<LoadSuspense data={data}>
				<EmptyData data={data}>
					{data.data.blocks.map((block, idx) => (
						<BlockRenderer key={idx} block={block} />
					))}
				</EmptyData>
			</LoadSuspense>

			<TextContainer>
				<MerchantCredits />
			</TextContainer>
		</Layout>
	)
}
