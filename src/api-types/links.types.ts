import { Brand } from 'utils.type'

type LinkId = Brand<number, 'LinkId'>

export type LinksType = {
	id: LinkId
	url: string
	description: string
}
