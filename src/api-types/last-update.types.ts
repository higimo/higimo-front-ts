import { Brand, ISOString } from 'utils.type'

type UpdateNewsId = Brand<number, 'UpdateNewsId'>

export type UpdateNewsType = {
	id: UpdateNewsId
	source: string
	date: ISOString
	text: string
	link: string
}
