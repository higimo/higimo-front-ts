import { FunctionComponent } from 'preact'
import { KeyOf } from 'utils.type'

import { useMerchant } from 'hook/data/use-merchant'

import { ProductBanner } from 'components/merchant/product-banner'

import { PRODUCT } from 'components/merchant/data'

type ProductServerBannerPropsType = {
	productKey: KeyOf<typeof PRODUCT>;
	withBackground?: boolean;
};

/**
 * Получает данные о товаре из бэка
 */
export const ProductServerBanner: FunctionComponent<ProductServerBannerPropsType> = ({
	productKey,
	withBackground,
}) => {
	const { products, isProductEmpty, isProductLoaded } = useMerchant();
	const productId = PRODUCT[productKey].id;
	const currentProduct = products.find(product => product.id === productId);

	if (!isProductLoaded || isProductEmpty || !currentProduct) {
		return null;
	}

	return (
		<ProductBanner
			product={currentProduct}
			withBackground={withBackground} />
	);
};
