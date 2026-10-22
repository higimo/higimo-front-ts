import { FetchError } from 'errors/fetch-error'
import { HigimoApiError } from 'errors/higimo-api-error'
import { JsonParseError } from 'errors/json-parse-error'
import { PolicyFailError } from 'errors/policy-fail-error'
import { ServerFailError } from 'errors/server-fail-error'
import { ValidationFailError } from 'errors/validation-fail-error'

import { isAbortError } from 'utils/types/is-abort-error'
import { toast } from 'toast'

/**
 * Показывает тост для любой ошибки, которую умеет обрабатывать приложение.
 * Возвращает true, если ошибка обработана (тост показан или умышленно подавлена).
 */
export const handleApiError = (error: unknown): boolean => {
	const skipError =
		error instanceof ValidationFailError
		|| isAbortError(error)

	if (skipError) {
		return false
	}

	if (error instanceof ServerFailError) {
		toast.error(error.message || 'Ошибка сервера, попробуйте позже')
		return true
	}
	if (error instanceof PolicyFailError) {
		toast.warning(error.message || 'Действие недоступно')
		return true
	}
	if (error instanceof HigimoApiError) {
		toast.error(error.message || `Ошибка ${error.status}`)
		return true
	}

	if (error instanceof FetchError) {
		toast.error('Нет соединения с сервером')
		return true
	}
	if (error instanceof JsonParseError) {
		toast.error('Некорректный ответ сервера')
		return true
	}

	console.error('[handleApiError] unknown error', error)
	toast.error('Что-то пошло не так, придётся смотреть в консоль')
	return false
}
