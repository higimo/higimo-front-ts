import { VkPhotoType } from 'api-types/vk.types'

// TODO: [LIGHT] написать тесты, документировать JSDoc
export const getVkPhotosUrl = (sizes: VkPhotoType['sizes']): string => {
	const finded = sizes.find(item => item.type === 'r' || item.type === 'x')
	if (finded) {
		return finded.url
	}
	return ''
}
