import { Brand } from 'utils.type'

type LogismId = Brand<number, 'LogismId'>

export type LogismType = {
	id: LogismId
	text: string
}
