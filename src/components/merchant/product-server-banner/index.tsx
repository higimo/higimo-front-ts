import { FunctionComponent } from 'preact'
import { KeyOf } from 'utils.type'

import { useMerchant } from 'hook/data/use-merchant'

import { ProductBanner } from 'components/merchant/product-banner'

import { MERCHANT_PRODUCT_ID_MAPPING } from 'data/merchant/merchant-product-id-mapping'

type ProductServerBannerPropsType = {
	productKey: KeyOf<typeof MERCHANT_PRODUCT_ID_MAPPING>
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
	const productId = MERCHANT_PRODUCT_ID_MAPPING[productKey]
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
