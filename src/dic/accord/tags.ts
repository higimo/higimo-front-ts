import { AccordTags } from 'api-types/accord.types'

export const mainTags: AccordTags = {
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

export const extendTags: AccordTags  = {
	new:      'нью',
	pop:      'популярно',
	nolist:   'Без списков',
	manylist: 'во многих списках',
} as const

export const totalTags: AccordTags = {
	...mainTags,
	...extendTags,
} as const satisfies AccordTags


