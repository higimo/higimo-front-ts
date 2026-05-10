import { Brand } from 'utils.type'

type TableGameId = Brand<number, 'TableGameId'>

export type TableGameType = {
	id: TableGameId
	name: string
	text: string
}
