export type MerchantBenefitType = {
	title: string;
	description: string;
};
type MerchantOfferType = {
	id: number;
	sku: string;
	version_name: string;
	price: number;
	is_active: boolean;
};
export type MerchantFeatureType = {
	title: string;
	value: string;
};

export type MerchantProductType = {
	id: string; // uuid
	title: string;
	image: string;
	anons: string;
	description: string;
	benefits: MerchantBenefitType[];
	features: MerchantFeatureType[];
	is_active: boolean;
	offers: MerchantOfferType[];
};
