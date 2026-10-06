import { LaravelErrorBody } from 'errors/higimo-api-error'
import { isObject } from 'utils/types/is-object'

/**
 * Проверяет, что это контракт-конверт из валидационной ошибки Laravel
 */
export const isLaravelErrorBody = (v: unknown): v is LaravelErrorBody =>
	isObject(v) && typeof v.message === 'string'
