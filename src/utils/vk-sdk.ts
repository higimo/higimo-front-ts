import { VkSessionType } from 'api-types/vk.types'

import { VK_API_ID, VK_API_VERSION, VK_SCOPE } from 'config/VK-API-ID'

export type VkAuthResultType = {
	status: string
	session: VkSessionType | null
}

// TODO: [LIGHT] написать тесты, документировать JSDoc
export const startVkSdk = (onAuth: (result: VkAuthResultType) => void): void => {
	VK.init({ apiId: VK_API_ID, apiVersion: VK_API_VERSION })
	VK.Auth.login(onAuth, VK_SCOPE)
}
