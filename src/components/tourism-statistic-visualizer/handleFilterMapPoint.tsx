import { PovType } from 'components/tourism/data/russia-city2';
import { TagCategory } from 'hook/tags/use-smart-tags';
import { ValueOf } from 'utils.type';

import { FILTER_TAG_NAME_TO_KEY_MAP, FILTER_TAGS, SORT_MAP, typeFilters, VISITED_MAP } from 'components/tourism/VISITED_MAP';

type HandleFilterMapPointPropsType = {
	selectedIds: Set<string>;
	isChooseVisitedMode: (val: ValueOf<typeof VISITED_MAP>) => boolean;
};
export const handleFilterMapPoint = ({ selectedIds, isChooseVisitedMode }: HandleFilterMapPointPropsType) => (item: PovType) => {
	if (selectedIds.has('Все')) {
		return true;
	}

	if (isChooseVisitedMode(VISITED_MAP.VISITED) && 'visited' in item && !item.visited) {
		return false;
	}
	if (isChooseVisitedMode(VISITED_MAP.WANTED) && 'visited' in item && !item.visited) {
		return false;
	}

	if (selectedIds.has('Россия') || selectedIds.has('Иностранное')) {
		if ('country' in item) {
			if (selectedIds.has('Россия') && item.country !== 'Россия') {
				return false;
			} else if (selectedIds.has('Иностранное') && item.country === 'Россия') {
				return false;
			} else {
				return true;
			}
		} else {
			return false;
		}
	}

	for (const selectedTagTitle of selectedIds.values()) {
		const key = selectedTagTitle as keyof typeof FILTER_TAG_NAME_TO_KEY_MAP;
		const mappingKey = FILTER_TAG_NAME_TO_KEY_MAP[key] as keyof typeof typeFilters;
		const realTagName = typeFilters[mappingKey] as readonly string[];
		if (!realTagName.includes(item.type)) {
			return false;
		}
	}

	return true;
};

export const handleSort = (isChooseSortMode: (value: ValueOf<typeof SORT_MAP>) => boolean) => (a: PovType, b: PovType) => {
	if (isChooseSortMode(SORT_MAP.INIT)) {
		return 0;
	}
	if (isChooseSortMode(SORT_MAP.VISITED)) {
		// @ts-ignore
		return b.visited - a.visited;
	}
	if (isChooseSortMode(SORT_MAP.WANTED)) {
		// @ts-ignore
		return a.visited - b.visited;
	}
	if (isChooseSortMode(SORT_MAP.ALPHABET)) {
		return a.title.localeCompare(b.title);
	}
	return 0;
};

export const TOURISM_VISITED_TAG_CATEGORY: TagCategory[] = [
	{
		group: {
			id: 1,
			title: 'Основной',
		},
		tags: FILTER_TAGS.map(({ label }, index) => ({
			id: index,
			title: label
		}))
	},
];
