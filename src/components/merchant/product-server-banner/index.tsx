import { FunctionComponent } from 'preact'
import { KeyOf } from 'utils.type'

import { useMerchant } from 'hook/data/use-merchant'

import { ProductBanner } from 'components/merchant/product-banner'

import { MERCHANT_PRODUCT_CACHE } from 'data/merchant/merchant-product-cache'

type ProductServerBannerPropsType = {
	productKey: KeyOf<typeof MERCHANT_PRODUCT_CACHE>
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
	const productId = MERCHANT_PRODUCT_CACHE[productKey].id
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
