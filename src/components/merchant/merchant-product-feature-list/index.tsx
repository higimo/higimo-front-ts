import { Fragment, FunctionComponent } from 'preact'
import { MerchantProductType } from 'api-types/merchant.types'

import './style.css'

// TODO: [ONE_CLASS_COMPONENT] прям отдельный компонент нужен? Мб, сделать общий с className

type MerchantProductFeatureListPropsType = {
	product: MerchantProductType
}

export const MerchantProductFeatureList: FunctionComponent<MerchantProductFeatureListPropsType> = ({
	product
}) => !!product.features.length && (
	<Fragment>
		<h2>Характеристики товара</h2>
		<div className="feature">
			{product.features.map(feature => (
				<div className="feature__item">
					<div className="feature__title">{feature.title}</div>
					<div className="feature__value">{feature.value}</div>
				</div>
			))}
		</div>
	</Fragment>
)
