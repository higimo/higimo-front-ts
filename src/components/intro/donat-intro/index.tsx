import { FunctionComponent } from 'preact'

import { ProductServerBanner } from 'components/merchant/product-server-banner'

import './style.css'

export const DonatIntro: FunctionComponent = () => (
	<ProductServerBanner productKey="COFFEE" />
)
