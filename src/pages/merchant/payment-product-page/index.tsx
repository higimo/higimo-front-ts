import { FunctionComponent } from 'preact'

import { useLocation } from 'preact-iso'
import { useMerchant } from 'hook/data/use-merchant'

import { Layout } from 'components/ui/layout/Layout'
import { MerchantPaymentForm } from 'components/merchant/merchant-payment-form'
import { MerchantProductBenefitList } from 'components/merchant/merchant-product-benefit-list'
import { MerchantProductFeatureList } from 'components/merchant/merchant-product-feature-list'
import { MerchantProductItem } from 'components/merchant/merchant-product-item'
import { TextContainer } from 'components/ui/text-container'

import { getMerchantProductById } from 'context/merchant-signal'

import { DEFAULT_ID } from 'config/DEFAULT-ID'
import { ROUTE_LINK } from 'dic/route/ROUTE_LINK'

import '../merchant-style.css'
import './style.css'
import { LoadSuspense } from 'components/ui/load-suspense'
import { EmptyData } from 'components/ui/empty-data'

export const PaymentProductPage: FunctionComponent = () => {
	const state = useMerchant()
	const { query: { id = DEFAULT_ID } } = useLocation()

	const currentProduct = getMerchantProductById(id)

	return (
		<Layout title="Страница оплаты" className="payment-page">
			<LoadSuspense data={state}>
				<EmptyData data={state}>
					<TextContainer>
						<MerchantProductItem
							key={id}
							product={currentProduct}
						/>
					</TextContainer>
				</EmptyData>
			</LoadSuspense>

			<LoadSuspense data={state}>
				<EmptyData data={state}>
					<TextContainer>
						<MerchantPaymentForm
							key={id}
							product={currentProduct}
						/>
					</TextContainer>
				</EmptyData>
			</LoadSuspense>

			<LoadSuspense data={state}>
				<EmptyData data={state}>
					<MerchantProductBenefitList
						key={id}
						product={currentProduct}
					/>
				</EmptyData>
			</LoadSuspense>

			<LoadSuspense data={state}>
				<EmptyData data={state}>
					<TextContainer>
						<MerchantProductFeatureList
							key={id}
							product={currentProduct}
						/>
					</TextContainer>
				</EmptyData>
			</LoadSuspense>

			{/* TODO: [FEATURE] Пошерить */}
			{/* TODO: [FEATURE] Купить другому */}

			<TextContainer>
				<a href={ROUTE_LINK.merchantIndex}>← В магазин</a>
				<br />
				<a href={ROUTE_LINK.index}>← На главную</a>
			</TextContainer>

			{/* TODO: [LIGHT] вроде был компонент? */}
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
