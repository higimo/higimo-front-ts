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

import { setRenderBlockVariables } from 'context/render-block-variables-store'

import { ADRESS, BEGET_ADRESS, NAME, PHONE } from 'data/merchant/merchant-contacts'

import '../merchant-style.css'

export const PersonalPolicyPage: FunctionComponent = () => {
	setRenderBlockVariables({
		ADRESS,
		BEGET_ADRESS,
		NAME,
		PHONE
	})

	const [ data ] = useJsonApi<PageJSONData>('/json/merchant/privacy-policy.json')

	return (
		<Layout title="Политика обработки ПД">
			<div className="merchant-text-page">
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
			</div>
		</Layout>
	)
}
