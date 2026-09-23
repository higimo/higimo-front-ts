import { PortfolioProjectFullType } from 'api-types/portfolio.types'

// TODO: [HARD] На широких экранах 5 в ряд делать? Одновременно в коде и css надо
const convertCoverSizeToWidth = (coverSize: PortfolioProjectFullType['cover_size']): number => {
	if (coverSize === 'high') {
		return 4
	}
	if (coverSize === 'big') {
		return 2
	}
	if (coverSize === 'normal') {
		return 1
	}
	// TODO: [BACKEND] small 1 — их показывать невысокой, но длинной строкой шириной 4
	return 1
}
export function packElements(elements: PortfolioProjectFullType[]): PortfolioProjectFullType[][] {
	const rows: PortfolioProjectFullType[][] = []

	for (const element of elements) {
		if (convertCoverSizeToWidth(element.cover_size) === 4) {
			rows.push([element])
			continue
		}

		let placed = false

		for (let i = Math.max(0, rows.length - 6); i < rows.length; i++) {
			const row = rows[i]
			const rowWidth = row.reduce((sum, el) => sum + convertCoverSizeToWidth(el.cover_size), 0)

			if (rowWidth + convertCoverSizeToWidth(element.cover_size) <= 4) {
				if (convertCoverSizeToWidth(element.cover_size) == 2) {
					row.unshift(element)
				} else {
					row.push(element)
				}
				placed = true
				break
			}
		}

		if (!placed) {
			rows.push([element])
		}
	}

	return rows
}
