import { VkSessionType } from 'api-types/vk.types'

const VK_API_ID = 6661731
const VK_API_VERSION = '5.199'
const VK_SCOPE = 4

export type VkAuthResultType = {
	status: string
	session: VkSessionType | null
}

export const startVkSdk = (onAuth: (result: VkAuthResultType) => void): void => {
	VK.init({ apiId: VK_API_ID, apiVersion: VK_API_VERSION })
	VK.Auth.login(onAuth, VK_SCOPE)
}
