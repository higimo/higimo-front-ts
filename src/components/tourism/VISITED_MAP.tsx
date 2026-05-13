import { subjectPederationTypes, onlyPovTypes } from 'components/tourism/data/city-types'
import { TagCategory } from 'hook/tags/use-smart-tags'

// Переключение визуализации статистики путешествий
export const VISUALIZATOR_MAP = {
	MAP:   'MAP',
	CARD:  'CARD',
	TABLE: 'TABLE',
} as const
export const VISITED_MAP = {
	INIT:    'INIT',
	VISITED: 'VISITED',
	WANTED:  'WANTED',
} as const
export const SORT_MAP = {
	INIT:     'INIT',
	VISITED:  'VISITED',
	WANTED:   'WANTED',
	ALPHABET: 'ALPHABET',
} as const

// Теги общей статистики путешествий
export const TAGS_NAME = [
	'Все',

	'Иностранное',
	'Россия',

	'Субъекты федерации',
	'Республики',
	'Края',
	'Области',
	'Города федерального значения',
	'Автономные области',

	'Округа Москвы',
	'Поселения Москвы',
	'Районы Москвы',
	'Станции метро Москвы',

	'Точки интереса',
	'Вымершие города',
	'Крепости',
	'Каньоны',
	'Парки',
	'Монастыри',
	'Каменоломни',
	'Города',
	'Деревни',
	'ЗАТО',
] as const

export const TAGS_NAME_TO_POV_TYPE_MAPPING: Record<typeof TAGS_NAME[number], readonly any[]> = {
	'Все': [],

	'Иностранное': [],
	'Россия':      [],

	'Субъекты федерации':           subjectPederationTypes,
	'Республики':                   ['республика'],
	'Края':                         ['край'],
	'Области':                      ['область'],
	'Города федерального значения': ['город федерального значения'],
	'Автономные области':           ['автономный область', 'автономный округ'],

	'Округа Москвы':        ['административный округ Москвы', 'округ Москвы'],
	'Поселения Москвы':     ['поселение Москвы'],
	'Районы Москвы':        ['район Москвы'],
	'Станции метро Москвы': ['метро Москвы'],

	'Точки интереса':  onlyPovTypes,
	'Вымершие города': ['вымерший город'],
	'Крепости':        ['крепость'],
	'Каньоны':         ['каньон'],
	'Парки':           ['парк'],
	'Монастыри':       ['монастырь'],
	'Каменоломни':     ['каменоломни'],
	'Города':          ['город'],
	'Деревни':         ['деревня'],
	'ЗАТО':            ['ЗАТО'],
} as const

export const TOURISM_VISITED_TAG_CATEGORY: TagCategory[] = [
	{
		group: {
			id: 1,
			title: 'Основной',
		},
		tags: TAGS_NAME.map((tagName, index) => ({
			id: index,
			title: tagName
		}))
	},
];

