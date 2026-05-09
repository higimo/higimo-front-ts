type AccordTags = {
	[key: string]: string
}

export const MAIN_TAGS: AccordTags = {
	liric:     'лирика',
	scream:    'поорать',
	korol:     'Король и шут',
	funny:     'смешное',
	rap:       'речитатив',
	old:       'старинное',
	ussr:      'СССР',
	lacky:     'зайдёт',
	newschool: 'ньюскул',
	bard:      'барды',
} as const

export const EXTEND_TAGS: AccordTags = {
	new:      'нью',
	pop:      'популярно',
	nolist:   'Без списков',
	manylist: 'во многих списках',
} as const

export const TOTAL_TAGS: AccordTags = {
	...MAIN_TAGS,
	...EXTEND_TAGS,
}
