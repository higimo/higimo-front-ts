import { Brand } from 'utils.type'

type DemagogId = Brand<number, 'DemagogId'>

export type DemagogType = {
	id: DemagogId
	name: string
	description: string
}
