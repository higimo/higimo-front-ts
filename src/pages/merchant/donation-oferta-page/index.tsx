import { FunctionComponent } from 'preact'
import { PageJSONData } from 'components/block-renderer/types'

import { useJsonApi } from 'hook/fetch/use-json-api'
import { useLoadingState } from 'hook/fetch/use-loading-state'
import { usePageTitle } from 'hook/browser/use-page-title'

import { BlockRenderer } from 'components/block-renderer/BlockRenderer'
import { Breadcrumps } from 'components/ui/breadcrumps'
import { Loading } from 'components/ui/loading'
import { MerchantCredits } from 'components/merchant/merchant-credits'
import { MerchantPolicyNavigation } from 'components/merchant/merchant-policy-navigation'
import { NotFoundData } from 'components/ui/not-found-data'
import { TextContainer } from 'components/ui/text-container'

import '../merchant-style.css'

export const DonationOfertaPage: FunctionComponent = () => {
	usePageTitle('Донатная оферта')

	const [ data ] = useJsonApi<PageJSONData>('/json/merchant/donation-policy.json')
	const isLoading = useLoadingState([data.status])
	const isError = data.status === 'ERROR'

	if (isLoading) {
		return <Loading />
	}

	return (
		<div className="merchant-text-page">
			<TextContainer>
				<Breadcrumps />
				<MerchantPolicyNavigation />
			</TextContainer>

			{(isError
				? (<NotFoundData />)
				: (
					data.data.blocks.map((block, idx) => (
						<BlockRenderer key={idx} block={block} />
					))
				)
			)}

			<TextContainer>
				<MerchantCredits />
			</TextContainer>
		</div>
	)
}
