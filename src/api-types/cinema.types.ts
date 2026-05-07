import { Brand, Code } from 'utils.type'

type CinemaId = Brand<number, 'CinemaId'>

export type CinemaType = {
	id: CinemaId
	title: string
	code: Code
	text: string
};
