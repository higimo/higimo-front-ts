import { FunctionComponent } from 'preact'
import { initPayment } from './index-meme'
import { FormValues } from 'components/merchant/merchant-payment-form/types'

import { useMerchant } from 'hook/use-merchant'
import { usePageTitle } from 'hook/use-page-title'
import { useLocation } from 'preact-iso'
import { useLayoutEffect } from 'preact/hooks'
import { useForm } from 'react-hook-form'

import { MerchantProductBenefits } from 'components/merchant/merchant-product-benefits'
import { MerchantProductCard } from 'components/merchant/merchant-product-card'
import { MerchantProductFeature } from 'components/merchant/merchant-product-features'
import { MerchantPayBlock } from 'components/merchant/merchant-pay-block'
import { MerchantPaymentForm } from 'components/merchant/merchant-payment-form'
import { NotFoundData } from 'components/ui/not-found-data'
import { TextContainer } from 'components/ui/text-container'
import { Loading } from 'components/ui/loading'

import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'

import './style.css'

export const PaymentPage: FunctionComponent = () => {
	const { products, isProductEmpty, isProductLoaded } = useMerchant()
	const { query: { id = null } } = useLocation()

	usePageTitle('Страница оплаты')

	const currentProduct = products.find(product => product.id === id)

	const { register, getValues } = useForm<FormValues>({
		defaultValues: {
			email: '',
			comment: ''
		}
	})

	useLayoutEffect(() => {
		if (!currentProduct) {
			return
		}

		initPayment(() => ({
			currentProduct,
			getValues
		}))
			.then()
			.catch()
	}, [])

	if (!isProductLoaded) {
		<Loading />
	}
	if (!id || isProductEmpty || !currentProduct) {
		return <NotFoundData />
	}

	return (
		<div className="payment-page">
			<TextContainer>
				<MerchantProductCard product={currentProduct} />
			</TextContainer>
			<TextContainer>
				<MerchantPayBlock />
			</TextContainer>
			<TextContainer>
				<MerchantPaymentForm register={register} />
			</TextContainer>
			<MerchantProductBenefits product={currentProduct} />
			<TextContainer>
				<MerchantProductFeature product={currentProduct} />
			</TextContainer>
			{/* Пошерить */}
			{/* Купить другому */}
			<TextContainer>
				<a href={ROUTE_LINKS.merchantIndex}>← В магазин</a>
				<br />
				<a href={ROUTE_LINKS.index}>← На главную</a>
			</TextContainer>

			<TextContainer>
				<h2>Дальше быстрым речитативом кому ты платишь</h2>
				<ul>
					<li><a href={ROUTE_LINKS.merchantPaymentPolicy}>Порядок оплаты</a></li>
					<li><a href={ROUTE_LINKS.merchantPersonalPolicy}>Политика обработки ПД</a></li>
					<li><a href={ROUTE_LINKS.merchantPaymentOferta}>Оферта</a></li>
					<li><a href={ROUTE_LINKS.merchantDonationOferta}>Донатная оферта</a></li>
				</ul>
			</TextContainer>

		</div>
	)
}
