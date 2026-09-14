import { describe, it, expect } from 'vitest'
import { formatPriceWithCent } from 'utils/formatter/format-price-with-cent'

describe('[utils] formatPriceWithCent', () => {
	it('Показывает только копейки', () => {
		expect(formatPriceWithCent(20)).toBe('0,20 ₽')
	})

	it('Показывает копейки и целые рубли', () => {
		expect(formatPriceWithCent(2090)).toBe('20,90 ₽')
	})

	it('Показывает целые рубли, но копейки оставляет', () => {
		expect(formatPriceWithCent(200)).toBe('2,00 ₽')
	})
})
