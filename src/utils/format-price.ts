export const formatPrice = (price: number) => {
	const normalizePrice = price / 100
	return `${normalizePrice.toFixed(0).replace('.', ',')} ₽`
}
