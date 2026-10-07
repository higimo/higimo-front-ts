import { FiledFormPropsType } from 'components/form/filed-form'

/**
 * Вариант схемы для `<select>`: `type: 'select'`, `values` обязателен
 */
type FormFieldSchemeBase<K extends PropertyKey> = {
	title: string
	description?: string
	autocomplete?: boolean
	required?: boolean
} & (K extends 'id' ? { readonly: true } : { readonly?: boolean })

/** Select-вариант: `type: 'select'` обязателен, `values` обязателен. */
type FormFieldSelectScheme<K extends PropertyKey> = FormFieldSchemeBase<K> & {
	type: 'select'
	values: readonly string[]
}

/**
 * Input/textarea-вариант.
 * `type` опционален — если не указан, `FiledForm` подставит `'text'`.
 * `values` запрещён.
 */
type FormFieldInputScheme<K extends PropertyKey> = FormFieldSchemeBase<K> & {
	type?: Exclude<FiledFormPropsType['type'], 'select'>
	values?: never
}

type FormFieldScheme<K extends PropertyKey> =
	| FormFieldSelectScheme<K>
	| FormFieldInputScheme<K>

/**
 * Словарь полей формы, ключи которого обязаны совпадать с ключами `T`.
 * Если в `T` появится новое поле — здесь будет ошибка, пока его не опишешь.
 * Если добавишь лишний ключ — тоже ошибка.
 */
export type FormScheme<T> = {
	[K in keyof T]: FormFieldScheme<K>
}
