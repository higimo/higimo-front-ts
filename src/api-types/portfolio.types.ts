export type PortfolioIdsType = {
	id: number;
	vendor: number;
	code: string;
};
export type PortfolioTag = {
	id: number;
	title: string;
};
export type PortfolioGroupTagType = {
	id: number;
	title: string;
};
export type PortfolioGroupedTagType = {
	group: PortfolioGroupTagType;
	tags: PortfolioTag[];
};
export type PortfolioWorkerType = {
	id: number;
	full_name: string;
	login: string;
	company: string;
	image: null;
	role: string;
	link?: string;
};
export type PortfolioCreditsType = {
	role: string;
	worker: PortfolioWorkerType;
};
export type PortfolioVendorType = {
	id: number;
	code: string;
	title: string;
	description?: string;
};
// TODO: [MEDIUM] бекенд Вот бы добавить следующий и предыдущий кейс
export type PortfolioProjectApiType = {
	id: number;
	vendor_id: number;
	vendor: PortfolioVendorType;
	name: string;
	code: string;
	date: string; // yyy-mm-dd
	image: 'png' | 'jpg';
	cover_size: 'high' | 'big' | 'normal' | 'small';
	isLink: boolean;
	link?: string;
};
// TODO: [MEDIUM] отделить тип для сингл страницы от остальных
export type PortfolioProjectType = PortfolioProjectApiType & {
	tags: PortfolioTag[];
	credits?: PortfolioCreditsType[];
	description?: string;
	text?: string;
};
