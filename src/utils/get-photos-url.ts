import { VkPhotoType } from 'api-types/vk.types'

export const getPhotosUrl = (sizes: VkPhotoType['sizes']): string => {
	const finded = sizes.find(item => item.type === 'r' || item.type === 'x')
	if (finded) {
		return finded.url
	}
	return ''
}
