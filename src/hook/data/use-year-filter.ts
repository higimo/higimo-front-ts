import { useMemo } from 'preact/hooks'
import { UnixTime } from 'utils.type'

import { getYearFromTimestamp } from 'utils/formatter/get-year-from-timestamp'

/**
 * Хук для фильтрации данных по году
 */
export const useYearFilter = <T extends { time: UnixTime }>(data: T[], year: number): T[] =>
	useMemo(() => data.filter(item => getYearFromTimestamp(item.time) === year), [data, year])
