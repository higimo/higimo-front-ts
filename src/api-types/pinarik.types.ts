import { Brand, DateOnlyString } from "utils.type"

type PinarikId = Brand<number, 'PinarikId'>

export type PinarikType = {
	id: PinarikId
	date: DateOnlyString
	score: -1 | 0 | 1
	description: string
}
