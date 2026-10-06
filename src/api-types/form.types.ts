import { FiledFormPropsType } from 'components/form/filed-form'

/**
 * Схема одного поля
 * `K` нужен, чтобы включить обязательный `readonly: true` для поля `id`
 */
export type FormFieldScheme<K extends PropertyKey> = K extends 'id'
	? {
		type: FiledFormPropsType['type']
		title: string
		description?: string
		// Требуем всегда readonly для id
		readonly: true
	}
	: {
		type: FiledFormPropsType['type']
		title: string
		description?: string
		readonly?: boolean
	}

/**
 * Словарь полей формы, ключи которого обязаны совпадать с ключами `T`.
 * Если в `T` появится новое поле — здесь будет ошибка, пока его не опишешь.
 * Если добавишь лишний ключ — тоже ошибка.
 */
export type FormScheme<T> = {
	[K in keyof T]: FormFieldScheme<K>
}
