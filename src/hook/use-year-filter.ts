import { useMemo } from 'preact/hooks'

import { getYearFromTimestamp } from 'utils/get-year-from-timestamp'

/**
 * Хук для фильтрации данных по году
 */
export const useYearFilter = <T extends { time: number }>(data: T[], year: number): T[] =>
	useMemo(() => data.filter(item => getYearFromTimestamp(item.time) === year), [data, year])