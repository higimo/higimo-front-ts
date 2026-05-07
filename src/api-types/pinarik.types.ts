import { Brand, DateOnlyString } from "utils.type"

type PinarikId = Brand<number, 'PinarikId'>

export type PinarikType = {
	id: PinarikId
	date: DateOnlyString
	score: number
	description: string
}
