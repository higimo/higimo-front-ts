export type MerchantBenefitType = {
	title: string
	description: string
}

type MerchantOfferType = {
	id: number
	sku: string
	version_name: string
	price: number
	is_active: boolean
}

export type MerchantFeatureType = {
	title: string
	value: string
}

export type MerchantProductType = {
	/** uuid */
	id: string
	/** Название */
	title: string
	/** url изображения */
	image: string
	/** Краткое описание */
	anons: string
	/** rich-text */
	description: string
	/** Включённость продукта */
	is_active: boolean
	benefits: MerchantBenefitType[]
	features: MerchantFeatureType[]
	offers: MerchantOfferType[]
}
