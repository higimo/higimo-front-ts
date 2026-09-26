import { NokiaMeetingStatisticType } from 'api-types/nokia.types'

import { PrepareDataResult } from 'components/nokia/nokia-statistic/types'

import { getYearFromTimestamp } from 'utils/date/get-year-from-timestamp'

// TODO: в ES2026 появились функции группировки и добавления в объект, даже если ключа нет, код сильно упростится
export const prepareData = (
	meetings: NokiaMeetingStatisticType[],
	selectedYearTag: number[],
	selectedTypeTag: string[]
): PrepareDataResult => {
	let meetingTypeDic: { [key: NokiaMeetingStatisticType['type']]: number } = {}
	let resultDataset: {
		[key: string]: {
			[key: NokiaMeetingStatisticType['type']]: number
		}
	} = {}

	for (let curMeeting of meetings) {
		const date = new Date(curMeeting.date)
		const monthNumber = ('0' + (date.getMonth() + 1)).slice(-2)
		const yearNumber = getYearFromTimestamp(date)

		const isSelectedYear = !selectedYearTag.includes(yearNumber) // Только выбранный год
		const isSelectedtype = !selectedTypeTag.includes(curMeeting.type) // Только выбранный год
		const isFailYear = yearNumber == 1970 // Пропускаем битый год
		const isFailType = !curMeeting.type.length // Пропускаем битые типы

		if (isSelectedYear || isFailYear || isFailType || isSelectedtype) {
			continue
		}

		const keyMonth = `${yearNumber}-${monthNumber}-01`
		if (!resultDataset[keyMonth]) {
			resultDataset[keyMonth] = {}
		}
		if (!resultDataset[keyMonth][curMeeting.type]) {
			resultDataset[keyMonth][curMeeting.type] = 0
		}
		meetingTypeDic[curMeeting.type] = 1
		resultDataset[keyMonth][curMeeting.type]! += 1
	}

	const dataset = Object.keys(resultDataset).map((key) => ({
		date: new Date(key),
		...resultDataset[key]
	}))

	const sortedDataset = dataset.concat().sort((a, b) => a.date.getTime() - b.date.getTime())
	const category = Object.keys(meetingTypeDic).sort((a, b) => a.localeCompare(b))

	return [
		category,
		sortedDataset,
	]
}


