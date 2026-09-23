import { FunctionComponent } from 'preact'
import { MerchantProductType } from 'api-types/merchant.types'

import './style.css'

type MerchantProductBenefitsPropsType = {
	product: MerchantProductType
}
export const MerchantProductBenefits: FunctionComponent<MerchantProductBenefitsPropsType> = ({
	product
}) => !!product.benefits.length && (
	<div class="benefit">
		{product.benefits.map(benefit => (
			<div class="benefit__item">
				<div className="benefit__title">{benefit.title}</div>
				<div className="benefit__description">{benefit.description}</div>
			</div>
		))}
	</div>
)
