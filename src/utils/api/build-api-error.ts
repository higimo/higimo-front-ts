import { HigimoApiError } from 'errors/higimo-api-error'
import { isLaravelErrorBody } from 'utils/types/is-laravel-error-body'

// TODO: [HARD] мб, разделять типы ошибок:
// JsonParse
// FetchError (сеть потеряна, таймаут)
// ServerFail (5**)
// PolicyFail (4**)
// ValidationFail (422, 400),
//
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
	if (isLaravelErrorBody(parsed)) {
		return new HigimoApiError(parsed.message, response.status, url, parsed);
	}

	return new HigimoApiError(
		response.statusText || `HTTP ${response.status}`,
		response.status,
		url,
		text
	);
};
