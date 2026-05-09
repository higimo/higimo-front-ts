export const formatPriceWithCent = (price: number) => {
	const normalizePrice = price / 100
	return `${normalizePrice.toFixed(2).replace('.', ',')} ₽`
}
