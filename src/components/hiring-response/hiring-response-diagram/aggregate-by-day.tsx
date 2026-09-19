import { ChartDataType } from 'components/hiring-response/chart.types'
import { PasteApiType } from 'api-types/paste.types'

export const aggregateByDay = async (data: PasteApiType[]): Promise<ChartDataType[]> => {
	try {
		const {
			rollup,
		} = await import('d3')
		const grouped = rollup(
			data,
			(items) => items.length,
			(d) => d.date
		)

		return Array.from(
			grouped,
			([label, value]) => ({ label, value })
		).sort((a, b) => a.label.localeCompare(b.label))
	} catch (error) {
		console.error('Failed to load D3:', error)
		return []
	}
}
