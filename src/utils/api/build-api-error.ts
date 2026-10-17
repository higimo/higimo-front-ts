import { HigimoApiError, LaravelErrorBody } from 'errors/higimo-api-error'
import { PolicyFailError } from 'errors/policy-fail-error'
import { ServerFailError } from 'errors/server-fail-error'
import { ValidationFailError } from 'errors/validation-fail-error'
import { isLaravelErrorBody } from 'utils/types/is-laravel-error-body'

// мб их ловить в ErrorBoundary, раз он в роутере всё равно перехватывает их,
// бизнес-логику обрабатывать в компонентах
// через .catch — так вроде приятнее выглядит, чем try {} catch {}

/**
 * Создаёт ошибку ApiError с ошибками Laravel или другими параметрами
 */
export const buildApiError = (
	response: Response,
	parsed: unknown,
	text: string,
	url: string
): HigimoApiError => {
	const { status, statusText } = response

	const isLaravel = isLaravelErrorBody(parsed)
	const message = isLaravel
		? parsed.message
		: (statusText || `HTTP ${status}`)
	const body: LaravelErrorBody | string = isLaravel ? parsed : text

	if (status === 400 || status === 422) {
		return new ValidationFailError(message, status, url, body)
	}

	if (status >= 500) {
		return new ServerFailError(message, status, url, body)
	}

	// 401, 403, 404, 405 и прочие 4xx
	return new PolicyFailError(message, status, url, body)
}
