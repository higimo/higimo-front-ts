export const getStartOfWeek = (date: Date) => {
	const d = new Date(date)
	const day = d.getDay()
	const diff = (day + 6) % 7
	d.setDate(d.getDate() - diff)
	d.setUTCHours(0, 0, 0, 0)
	return d
}
