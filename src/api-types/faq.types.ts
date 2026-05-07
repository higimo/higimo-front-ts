import { Brand, Code } from 'utils.type'

type FaqId = Brand<number, 'FaqId'>

export type FaqType = {
	id: FaqId
	name: string
	code: Code
	text: string
}
