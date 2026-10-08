import { FunctionComponent } from 'preact'
import { KeyOf } from 'utils.type'

import { useMerchant } from 'hook/data/use-merchant'

import { ProductBanner } from 'components/merchant/product-banner'

import { PRODUCT } from 'data/merchant/merchant-product-cache'

type ProductServerBannerPropsType = {
	productKey: KeyOf<typeof PRODUCT>
	withBackground?: boolean
}

/**
 * Получает данные о товаре из бэка
 */
export const ProductServerBanner: FunctionComponent<ProductServerBannerPropsType> = ({
	productKey,
	withBackground,
}) => {
	const { isProductEmpty, isProductLoaded, getProductById } = useMerchant()
	const productId = PRODUCT[productKey].id
	const currentProduct = getProductById(productId)

	if (!isProductLoaded || isProductEmpty || !currentProduct) {
		return null
	}

	return (
		<ProductBanner
			product={currentProduct}
			withBackground={withBackground}
		/>
	)
}
