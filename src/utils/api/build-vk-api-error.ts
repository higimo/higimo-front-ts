import { VkResponseError } from 'vendor/types'

import { VkAccessError } from 'errors/vk-access-error'
import { VkAuthError } from 'errors/vk-auth-error'
import { VkCaptchaError } from 'errors/vk-captcha-error'
import { VkError } from 'errors/vk-error'
import { VkRateLimitError } from 'errors/vk-rate-limit-error'
import { VkServerError } from 'errors/vk-server-error'
import { VkValidationError } from 'errors/vk-validation-error'

/**
 * Создаёт типизированную ошибку VK API по коду.
 * Если код неизвестен — возвращает базовый `VkError`.
 */
export const buildVkApiError = (
	payload: VkResponseError['error'],
	context: {
		method: string
		params: Record<string, unknown>
	}
): VkError => {
	const code = payload.error_code

	// Авторизация
	if ([5, 27, 28, 101].includes(code)) {
		return new VkAuthError(payload, context)
	}

	// Нет доступа к контенту или действию
	if ([7, 15, 18, 20, 21, 30, 200, 201, 203].includes(code)) {
		return new VkAccessError(payload, context)
	}

	// Лимиты запросов
	if ([6, 9, 29].includes(code)) {
		return new VkRateLimitError(payload, context)
	}

	// Капча
	if (code === 14) {
		return new VkCaptchaError(payload, context)
	}

	// Неверные параметры / метод / ID
	if ([3, 8, 100, 113, 150].includes(code)) {
		return new VkValidationError(payload, context)
	}

	// Внутренние ошибки VK
	if ([1, 10].includes(code)) {
		return new VkServerError(payload, context)
	}

	return new VkError(payload, context)
}
