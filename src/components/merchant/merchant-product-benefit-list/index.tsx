import { FunctionComponent } from 'preact'
import { MerchantProductType } from 'api-types/merchant.types'

import './style.css'

type MerchantProductBenefitListPropsType = {
	product: MerchantProductType | null
}

export const MerchantProductBenefitList: FunctionComponent<MerchantProductBenefitListPropsType> = ({
	product,
}) => product && !!product.benefits && (
	<div class="benefit">
		{product.benefits.map(benefit => (
			<div key={benefit.title} class="benefit__item">
				<div className="benefit__title">{benefit.title}</div>
				<div className="benefit__description">{benefit.description}</div>
			</div>
		))}
	</div>
)
