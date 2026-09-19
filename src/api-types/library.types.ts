import { Brand } from 'utils.type'

type LibraryId = Brand<number, 'LibraryId'>

export type LibraryType = {
	id: LibraryId
	author: string
	name: string
	addon: string
	isbn: string
	img: string
	anons: string
}

export type LibraryBookType = {
	id: string
	name: string
	author: string
	addon: string
	isbn: string
	img: string
	anons: string
}
