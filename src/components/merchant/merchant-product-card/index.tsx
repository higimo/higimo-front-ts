import { MerchantProductType } from 'api-types/merchant.types'
import { FunctionComponent } from 'preact'
import { formatPrice } from 'utils/formatter/format-price'

import './style.css'

type MerchantProductBenefitsPropsType = {
	product: MerchantProductType
}
export const MerchantProductCard: FunctionComponent<MerchantProductBenefitsPropsType> = ({
	product
}) => (
	<div class="product-card">
		<div class="product-title">{product.title}</div>
		<div class="product-content">
			<div
				class="product-description"
				dangerouslySetInnerHTML={{ __html: product.description }}
			/>
			<div class="price-row">
				<div class="price-label">Стоимость</div>
				<div class="price-block">{formatPrice(product.offers[0].price)}</div>
			</div>
		</div>
	</div>
)
