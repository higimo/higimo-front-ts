import { FunctionComponent } from 'preact'
import { MerchantProductType } from 'api-types/merchant.types'

import './style.css'

type MerchantProductBenefitListPropsType = {
	product: MerchantProductType
}

export const MerchantProductBenefitList: FunctionComponent<MerchantProductBenefitListPropsType> = ({
	product,
}) => !!product.benefits.length && (
	<div class="benefit">
		{product.benefits.map(benefit => (
			<div key={benefit.title} class="benefit__item">
				<div className="benefit__title">{benefit.title}</div>
				<div className="benefit__description">{benefit.description}</div>
			</div>
		))}
	</div>
)
