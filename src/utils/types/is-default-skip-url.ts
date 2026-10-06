import { DEFAULT_ID } from 'config/DEFAULT-ID'
import { ApiUrlType } from 'hook/fetch/use-api'

/**
 * Проверяет, что это URL с пропуском запроса
 * DEFAULT_ID используется как маркер пропуска запроса
 */
export const isDefaultSkipUrl = (url: ApiUrlType) =>
	(url as string).slice(-2) === DEFAULT_ID
