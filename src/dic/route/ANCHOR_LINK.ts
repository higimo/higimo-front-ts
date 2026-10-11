import { KeyOf } from 'utils.type'

export const ANCHOR_LINK = {
	travel: 'travel',
	service: 'service',
	blog: 'blog',

	hiringResponseForm: 'hiringResponseForm',
	hiringResponseGallery: 'hiringResponseGallery',

	// no use
	done: 'done',
} as const

export type AnchorLinksType = KeyOf<typeof ANCHOR_LINK>
