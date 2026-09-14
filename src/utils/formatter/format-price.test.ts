import { describe, it, expect } from 'vitest'
import { formatPrice } from 'utils/formatter/format-price'

describe('[utils] formatPrice', () => {
	it('Покажет только рубли, если есть только копейки', () => {
		expect(formatPrice(20)).toBe('0 ₽')
	})

	it('Покажет только рубли, без копеек', () => {
		expect(formatPrice(2020)).toBe('20 ₽')
	})

	it('Покажет только рубли, если копеек нет', () => {
		expect(formatPrice(20000)).toBe('200 ₽')
	})
})
