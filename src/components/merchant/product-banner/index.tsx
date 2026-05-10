import { FunctionComponent } from 'preact'
import cs from 'classnames'

import { MerchantProductType } from 'components/merchant/types'

import './style.css'

type ProductBannerPropsType = {
	product: MerchantProductType
	withBackground?: boolean
}

export const ProductBanner: FunctionComponent<ProductBannerPropsType> = ({
	product,
	withBackground = true
}) => {
	return (
		<div className="product-banner">
			<div className={cs(
				{ 'product-banner__container': withBackground },
			)}>
				<a
					className="product-banner__banner"
					href={`/checkout/?id=${product.id}`}
				>
					{/* <div className="product-banner__image">
						<img
							src={product.image}
						/>
					</div> */}
					<div className="product-banner__info">
						<div className="product-banner__name">
							{product.title}
						</div>
						<div className="product-banner__description">
							{product.anons}
						</div>
					</div>
				</a>
			</div>
		</div>
	)
}
