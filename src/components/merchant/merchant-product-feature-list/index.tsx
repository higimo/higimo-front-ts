import { Fragment, FunctionComponent } from 'preact'
import { MerchantProductType } from 'api-types/merchant.types'

import './style.css'

type MerchantProductFeatureListPropsType = {
	product: MerchantProductType | null
}

export const MerchantProductFeatureList: FunctionComponent<MerchantProductFeatureListPropsType> = ({
	product
}) => product && product.features && (
	<Fragment>
		<h2>Характеристики товара</h2>
		<div className="feature">
			{product.features.map(feature => (
				<div key={feature.title} className="feature__item">
					<div className="feature__title">{feature.title}</div>
					<div className="feature__value">{feature.value}</div>
				</div>
			))}
		</div>
	</Fragment>
)
