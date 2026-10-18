import { toast } from 'toast'

import { VkCaptchaError } from 'errors/vk-captcha-error'
import { VkRateLimitError } from 'errors/vk-rate-limit-error'
import { VkAuthError } from 'errors/vk-auth-error'
import { VkAccessError } from 'errors/vk-access-error'
import { VkError } from 'errors/vk-error'

/**
 * Единая обработка ошибок VK в репозитории:
 * показывает тост пользователю и возвращает true, если ошибка обработана.
 */
export const handleVkError = (error: unknown): boolean => {
	if (error instanceof VkCaptchaError) {
		toast.warning('Требуется ввод капчи')
		// здесь можно открыть модалку с error.captcha_img и повторить запрос
		return true
	}

	if (error instanceof VkRateLimitError) {
		toast.warning('Слишком много запросов, подождите')
		return true
	}

	if (error instanceof VkAuthError) {
		toast.error('Авторизация не действительна, переавторизуйтесь')
		return true
	}

	if (error instanceof VkAccessError) {
		toast.warning(error.error_msg)
		return true
	}

	if (error instanceof VkError) {
		toast.warning(error.error_msg)
		return true
	}

	return false
}
