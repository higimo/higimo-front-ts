export type ListPropertyType = {
	id: number;
	item_id: number;
	property_id: number;
	value: string;
	property: {
		id: number;
		item_id: number;
		name: string;
		type: string;
	};
};

export type ListerItem = {
	id: number;
	parent_id: number;
	title: string;
	code: string;
	created_at: number;
	children?: ListerItem[];
	parent?: ListerItem;
	values?: ListPropertyType[];
};

export type ListerProperty = {
	id: number;
	name: string;
	type: string;
	item: number;
};

export type ListerValue = {
	id: number;
	value: string;
	property: number;
	item: number;
};

export type ListListType = ListerItem & {
	child?: ListerItem[];
};
