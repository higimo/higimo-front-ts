import { FunctionComponent } from 'preact'

import { useMerchant } from 'hook/data/use-merchant'

import { Layout } from 'components/ui/layout/Layout'
import { Loading } from 'components/ui/loading'
import { NotFoundData } from 'components/ui/not-found-data/NotFoundData'
import { ProductBanner } from 'components/merchant/product-banner'
import { TextContainer } from 'components/ui/text-container'

import '../merchant-style.css'

export const MerchantPage: FunctionComponent = () => {
	const { products, isProductEmpty, isProductLoaded } = useMerchant()

	// TODO: [LIGHT] поставить компоненты, вместо этого
	if (!isProductLoaded) {
		return <Loading />
	}
	if (isProductEmpty) {
		return <NotFoundData />
	}

	return (
		<Layout title="Магазин">
			<div className="merchant-page">
				<TextContainer>
					<h2>Магазинчик Хигимо</h2>
				</TextContainer>

				{products.map(product => (
					<ProductBanner
						product={product}
						withBackground={true}
					/>
				))}
			</div>
		</Layout>
	)
}
