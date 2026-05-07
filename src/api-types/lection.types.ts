import { Brand, Code } from 'utils.type'

type LectionId = Brand<number, 'LectionId'>

export type LectionType = {
	id: LectionId
	name: string
	code: Code
	text: string
};
