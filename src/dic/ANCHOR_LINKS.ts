import { KeyOf } from 'utils.type'

export const ANCHOR_LINKS = {
	travel: 'travel',
	service: 'service',
	blog: 'blog',

	hiringResponseForm: 'hiringResponseForm',

	// no use
	done: 'done',
} as const

export type AnchorLinksType = KeyOf<typeof ANCHOR_LINKS>
