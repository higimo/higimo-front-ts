import { VkPhotoType } from 'api-types/vk.types'

/**
 * Возвращает URL фотографии ВКонтакте, выбирая самый крупный размер `x`/`r`
 *
 * @param sizes - Массив фотографий из VK API
 * @returns URL подходящего размера или `''`
 *
 * @example
 * getVkPhotoUrl([
 *   { type: 'm', url: 'small.jpg' },
 *   { type: 'x', url: 'big.jpg' },
 *   { type: 'r', url: 'huge.jpg' },
 * ])
 * // → 'huge.jpg' (первым найден 'r')
 *
 * // Нет подходящего размера
 * getVkPhotoUrl([{ type: 's', url: 'tiny.jpg' }])
 * // → ''
 */
export const getVkPhotosUrl = (sizes: VkPhotoType['sizes']): string => {
	const byType = (t: string) => sizes.find(s => s.type === t)?.url
	return byType('r') || byType('x') || ''
}
