import { FunctionComponent } from "preact"

import { PRDOUCT } from './data'

import './style.css'

type ProductBannerPropsType = {
	productKey: keyof typeof PRDOUCT
}

export const ProductBanner: FunctionComponent<ProductBannerPropsType> = ({ productKey }) => {
	return (
		<div className="product-banner">
			<div className="product-banner__container">
				<a
					className="product-banner__banner"
					href={`/checkout/?id=${PRDOUCT[productKey].id}`}
				>
					<div className="product-banner__image">
						<img
							src={PRDOUCT[productKey].image}
						/>
					</div>
					<div className="product-banner__info">
						<div className="product-banner__name">
							{PRDOUCT[productKey].name}
						</div>
						<div className="product-banner__description">
							{PRDOUCT[productKey].description}
						</div>
					</div>
				</a>
			</div>
		</div>
	)
}

export const CoffeeProductBanner = () => (
	<ProductBanner
		productKey="COFFEE"
	/>
)
