import { Brand } from 'utils.type'

type LibraryId = Brand<number, 'LibraryId'>

export type LibraryType = {
	/**
	 * Идентификатор
	 */
	id: LibraryId
	/**
	 * Автор книги
	 */
	author: string
	/**
	 * Название книги
	 */
	name: string
	/**
	 * Дополнительное название
	 */
	addon: string
	/**
	 * ISBN
	 */
	isbn: string
	/**
	 * URL картинки
	 */
	img: string
	/**
	 * Описание
	 */
	anons: string
}
