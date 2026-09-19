import { NokiaMeetingStatisticType } from 'api-types/nokia.types'

type ResultDatasetItem = {
	date: Date
	[key: NokiaMeetingStatisticType['type']]: number | Date
}

export type PrepareDataResult = [string[], ResultDatasetItem[]]
