import { VkAuthResultType } from 'api-types/vk.types'

import { VK_API_ID, VK_API_VERSION, VK_SCOPE } from 'config/VK-API-ID'

/**
 * Инициализирует VK SDK и открывает окно авторизации ВКонтакте
 *
 * Последовательно VK.init, VK.Auth.login
 *
 * @param onAuth - Колбэк по завершению авторизации
 *
 * @example
 * startVkSdk((result) => {
 *   if (result.status === 'connected' && result.session) {
 *     console.log('VK user id:', result.session.user.id)
 *   } else {
 *     console.warn('VK auth failed:', result.status)
 *   }
 * })
 */
export const startVkSdk = (onAuth: (result: VkAuthResultType) => void): void => {
	VK.init({ apiId: VK_API_ID, apiVersion: VK_API_VERSION })
	VK.Auth.login(onAuth, VK_SCOPE)
}
