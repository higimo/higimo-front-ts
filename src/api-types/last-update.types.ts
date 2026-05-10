import { Brand, DateOnlyString } from 'utils.type'

type UpdateNewsId = Brand<number, 'UpdateNewsId'>

export type UpdateNewsType = {
	id: UpdateNewsId
	source: string
	date: DateOnlyString
	text: string
	link: string
}
