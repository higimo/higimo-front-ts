import { FunctionComponent } from 'preact'
import { KeyOf } from 'utils.type'

import { useMerchant } from 'hook/data/use-merchant'

import { EmptyData } from 'components/ui/empty-data'
import { LoadSuspense } from 'components/ui/load-suspense'
import { MerchantProductBanner } from 'components/merchant/merchant-product-banner'

import { getMerchantProductById } from 'context/merchant-signal'

import { MERCHANT_PRODUCT_ID_MAPPING } from 'data/merchant/merchant-product-id-mapping'

type MerchantProductServerBannerPropsType = {
	productKey: KeyOf<typeof MERCHANT_PRODUCT_ID_MAPPING>
	withBackground?: boolean
}

/**
 * Получает данные о товаре из бэка
 */
export const MerchantProductServerBanner: FunctionComponent<MerchantProductServerBannerPropsType> = ({
	productKey,
	withBackground,
}) => {
	const state = useMerchant()
	const productId = MERCHANT_PRODUCT_ID_MAPPING[productKey]
	const currentProduct = getMerchantProductById(productId)

	return (
		<LoadSuspense data={state}>
			<EmptyData data={state}>
				<MerchantProductBanner
					product={currentProduct}
					withBackground={withBackground}
				/>
			</EmptyData>
		</LoadSuspense>
	)
}
