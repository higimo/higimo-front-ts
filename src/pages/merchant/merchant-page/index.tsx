import { FunctionComponent } from 'preact'

import { useMerchant } from 'hook/data/use-merchant'

import { EmptyData } from 'components/ui/empty-data'
import { Layout } from 'components/ui/layout/Layout'
import { LoadSuspense } from 'components/ui/load-suspense'
import { MerchantProductBanner } from 'components/merchant/merchant-product-banner'
import { TextContainer } from 'components/ui/text-container'

import '../merchant-style.css'

export const MerchantPage: FunctionComponent = () => {
	const state = useMerchant()

	return (
		<Layout title="Магазин">
			<div className="merchant-page">
				<TextContainer>
					<h2>Магазинчик Хигимо</h2>
				</TextContainer>

				<LoadSuspense data={state}>
					<EmptyData data={state}>
						{state.data && state.data.map(product => (
							<MerchantProductBanner
								key={product.id}
								product={product}
								withBackground={true}
							/>
						))}
					</EmptyData>
				</LoadSuspense>
			</div>
		</Layout>
	)
}
