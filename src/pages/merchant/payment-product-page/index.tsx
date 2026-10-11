import { FunctionComponent } from 'preact'

import { useLocation } from 'preact-iso'
import { useMerchant } from 'hook/data/use-merchant'

import { Layout } from 'components/ui/layout/Layout'
import { Loading } from 'components/ui/loading'
import { MerchantPayBlock } from 'components/merchant/merchant-pay-block'
import { MerchantPaymentForm } from 'components/merchant/merchant-payment-form'
import { MerchantProductBenefitList } from 'components/merchant/merchant-product-benefit-list'
import { MerchantProductItem } from 'components/merchant/merchant-product-item'
import { MerchantProductFeatureList } from 'components/merchant/merchant-product-feature-list'
import { NotFoundData } from 'components/ui/not-found-data'
import { TextContainer } from 'components/ui/text-container'

import { DEFAULT_ID } from 'config/DEFAULT-ID'
import { ROUTE_LINK } from 'dic/route/ROUTE_LINK'

import '../merchant-style.css'
import './style.css'

export const PaymentProductPage: FunctionComponent = () => {
	const { isProductEmpty, isProductLoaded, getProductById } = useMerchant()
	const { query: { id = DEFAULT_ID } } = useLocation()

	const currentProduct = getProductById(id)

	if (!isProductLoaded) {
		<Loading />
	}
	if (!id || isProductEmpty || !currentProduct) {
		return <NotFoundData />
	}

	return (
		<Layout title="Страница оплаты" className="payment-page">
			<TextContainer>
				<MerchantProductItem
					key={id}
					product={currentProduct}
				/>
			</TextContainer>

			<TextContainer>
				<MerchantPayBlock />
			</TextContainer>

			<TextContainer>
				<MerchantPaymentForm
					key={id}
					product={currentProduct}
				/>
			</TextContainer>

			<MerchantProductBenefitList
				key={id}
				product={currentProduct}
			/>

			<TextContainer>
				<MerchantProductFeatureList
					key={id}
					product={currentProduct}
				/>
			</TextContainer>

			{/* TODO: [FEATURE] Пошерить */}
			{/* TODO: [FEATURE] Купить другому */}

			<TextContainer>
				<a href={ROUTE_LINK.merchantIndex}>← В магазин</a>
				<br />
				<a href={ROUTE_LINK.index}>← На главную</a>
			</TextContainer>

			<TextContainer>
				<h2>Дальше быстрым речитативом кому ты платишь</h2>
				<ul>
					<li><a href={ROUTE_LINK.merchantPaymentPolicy}>Порядок оплаты</a></li>
					<li><a href={ROUTE_LINK.merchantPersonalPolicy}>Политика обработки ПД</a></li>
					<li><a href={ROUTE_LINK.merchantPaymentOferta}>Оферта</a></li>
					<li><a href={ROUTE_LINK.merchantDonationOferta}>Донатная оферта</a></li>
				</ul>
			</TextContainer>
		</Layout>
	)
}
