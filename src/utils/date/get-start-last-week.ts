import { getStartOfWeek } from 'utils/date/get-start-of-week'

export const getStartLastWeek = (date: Date) => {
	const d = new Date(getStartOfWeek(date))
	d.setDate(d.getDate() - 7)
	d.setUTCHours(0, 0, 0, 0)
	return d
}
