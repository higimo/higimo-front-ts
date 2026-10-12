import { NokiaMeetingStatisticType } from 'api-types/nokia.types'
import { PrepareDataResult } from 'components/nokia/nokia-statistic/types'

import { getYearFromTimestamp } from 'utils/date/get-year-from-timestamp'

export const prepareData = (
	meetings: NokiaMeetingStatisticType[],
	selectedYearTag: number[],
	selectedTypeTag: string[],
): PrepareDataResult => {
	let meetingTypeDic = new Set<string>()
	let resultDataset: {
		[key: string]: {
			[key: NokiaMeetingStatisticType['type']]: number
		}
	} = {}

	for (let curMeeting of meetings) {
		const date = new Date(curMeeting.date)
		const month = ('0' + (date.getMonth() + 1)).slice(-2)
		const year = getYearFromTimestamp(date)

		const isSelectedYear = !selectedYearTag.includes(year) // Только выбранный год
		const isSelectedtype = !selectedTypeTag.includes(curMeeting.type) // Только выбранный год
		const isFailYear = year == 1970 // Пропускаем битый год
		const isFailType = !curMeeting.type.length // Пропускаем битые типы

		if (isSelectedYear || isFailYear || isFailType || isSelectedtype) {
			continue
		}

		const keyMonth = `${year}-${month}-01`
		resultDataset[keyMonth] = resultDataset[keyMonth] ?? {}
		resultDataset[keyMonth][curMeeting.type] = (resultDataset[keyMonth][curMeeting.type] ?? 0) + 1

		meetingTypeDic.add(curMeeting.type)
	}

	const dataset = Object.entries(resultDataset)
		.map(([key, item]) => ({
			date: new Date(key),
			...item
		}))

	const category = Array.from(meetingTypeDic).sort((a, b) => a.localeCompare(b))

	return [
		category,
		dataset,
	]
}
