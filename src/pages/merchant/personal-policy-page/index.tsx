import type { FunctionComponent } from 'preact'
import type { PageJSONData } from 'components/block-renderer/types'

import { useJsonApi } from 'hook/use-json-api'
import { usePageTitle } from 'hook/use-page-title'

import { BlockRenderer } from 'components/block-renderer/BlockRenderer'
import { Breadcrumps } from 'components/ui/breadcrumps'
import { Loading } from 'components/ui/loading'
import { MerchantPolicyNavigation } from 'components/merchant/merchant-policy-navigation'
import { TextContainer } from 'components/ui/text-container'

import { setRenderBlockVariables } from 'components/stores/render-block-variables-store'

import { ADRESS, BEGET_ADRESS, NAME, PHONE } from 'components/merchant/merchant-const'

import '../merchant-style.css'

export const PersonalPolicyPage: FunctionComponent = () => {
	usePageTitle('Политика обработки ПД')

	setRenderBlockVariables({
		ADRESS,
		BEGET_ADRESS,
		NAME,
		PHONE
	})

	const data = useJsonApi<PageJSONData>('/json/merchant/privacy-policy.json')

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
