import { FunctionComponent } from 'preact'

import { usePageTitle } from 'hook/browser/use-page-title'
import { useMerchant } from 'hook/data/use-merchant'

import { Loading } from 'components/ui/loading'
import { ProductBanner } from 'components/merchant/product-banner'
import { TextContainer } from 'components/ui/text-container'

import { NotFoundPage } from 'pages/not-found-page'

import '../merchant-style.css'

export const MerchantPage: FunctionComponent = () => {
	usePageTitle('Магазин')

	const { products, isProductEmpty, isProductLoaded } = useMerchant()

	if (!isProductLoaded) {
		return <Loading />
	}
	if (isProductEmpty) {
		return <NotFoundPage />
	}

	return (
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
	)
}
