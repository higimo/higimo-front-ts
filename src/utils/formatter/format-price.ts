/**
 * Получает int число с копейками, преобразуя в строку рублей:
 * 200 = 2 ₽
 * 20000 = 200 ₽
 */
export const formatPrice = (price: number): string => {
	const normalizePrice = price / 100
	return `${normalizePrice.toFixed(0).replace('.', ',')} ₽`
}
