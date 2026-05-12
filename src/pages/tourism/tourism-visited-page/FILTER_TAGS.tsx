import { MAP_POINT_MAP } from './MAP_POINT_MAP';

export const FILTER_TAGS = [
	{ type: MAP_POINT_MAP.TOTAL, label: 'Все' },

	{ type: MAP_POINT_MAP.WORLD, label: 'Иностранное' },
	{ type: MAP_POINT_MAP.RUSSIA, label: 'Россия' },

	{ type: MAP_POINT_MAP.FEDERATION_SUBJECT, label: 'Субъекты федерации' },
	{ type: MAP_POINT_MAP.FEDERATION_REPUBLIC, label: 'Республики' },
	{ type: MAP_POINT_MAP.FEDERATION_KRAY, label: 'Края' },
	{ type: MAP_POINT_MAP.FEDERATION_OBLAST, label: 'Области' },
	{ type: MAP_POINT_MAP.FEDERATION_MEGACITY, label: 'Города федерального значения' },
	{ type: MAP_POINT_MAP.FEDERATION_AVTONOM, label: 'Автономные области' },

	{ type: MAP_POINT_MAP.MOSCOW_ADM_ORKUG, label: 'Округа Москвы' },
	{ type: MAP_POINT_MAP.MOSCOW_TOWN, label: 'Поселения Москвы' },
	{ type: MAP_POINT_MAP.MOSCOW_DISTRICT, label: 'Районы Москвы' },
	{ type: MAP_POINT_MAP.METRO_MOSCOW, label: 'Станции метро Москвы' },

	{ type: MAP_POINT_MAP.ONLY_POV, label: 'Точки интереса' },
	{ type: MAP_POINT_MAP.DEAD_TOWN, label: 'Вымершие города' },
	{ type: MAP_POINT_MAP.CASTLE, label: 'Крепости' },
	{ type: MAP_POINT_MAP.CANYON, label: 'Каньоны' },
	{ type: MAP_POINT_MAP.PARK, label: 'Парки' },
	{ type: MAP_POINT_MAP.MONASTERY, label: 'Монастыри' },
	{ type: MAP_POINT_MAP.QUARRY, label: 'Каменоломни' },
	{ type: MAP_POINT_MAP.CITY, label: 'Города' },
	{ type: MAP_POINT_MAP.VILLAGE, label: 'Деревни' },
	{ type: MAP_POINT_MAP.ZATO, label: 'ЗАТО' },
] as const
export const FILTER_TAG_NAME_TO_KEY_MAP = {
	'Все': MAP_POINT_MAP.TOTAL,

	'Иностранное': MAP_POINT_MAP.WORLD,
	'Россия': MAP_POINT_MAP.RUSSIA,

	'Субъекты федерации': MAP_POINT_MAP.FEDERATION_SUBJECT,
	'Республики': MAP_POINT_MAP.FEDERATION_REPUBLIC,
	'Края': MAP_POINT_MAP.FEDERATION_KRAY,
	'Области': MAP_POINT_MAP.FEDERATION_OBLAST,
	'Города федерального значения': MAP_POINT_MAP.FEDERATION_MEGACITY,
	'Автономные области': MAP_POINT_MAP.FEDERATION_AVTONOM,

	'Округа Москвы': MAP_POINT_MAP.MOSCOW_ADM_ORKUG,
	'Поселения Москвы': MAP_POINT_MAP.MOSCOW_TOWN,
	'Районы Москвы': MAP_POINT_MAP.MOSCOW_DISTRICT,
	'Станции метро Москвы': MAP_POINT_MAP.METRO_MOSCOW,

	'Точки интереса': MAP_POINT_MAP.ONLY_POV,
	'Вымершие города': MAP_POINT_MAP.DEAD_TOWN,
	'Крепости': MAP_POINT_MAP.CASTLE,
	'Каньоны': MAP_POINT_MAP.CANYON,
	'Парки': MAP_POINT_MAP.PARK,
	'Монастыри': MAP_POINT_MAP.MONASTERY,
	'Каменоломни': MAP_POINT_MAP.QUARRY,
	'Города': MAP_POINT_MAP.CITY,
	'Деревни': MAP_POINT_MAP.VILLAGE,
	'ЗАТО': MAP_POINT_MAP.ZATO,
} as const
