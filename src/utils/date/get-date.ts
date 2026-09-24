const month = 'января,февраля,марта,апреля,мая,июня,июля,августа,сентября,октября,ноября,декабря'.split(',')

/**
 * Отдаёт словом месяц:
 * 31 декабря
 */
export const getDate = (dateStr: string|null = null): string|null => {
	if (!dateStr) {
		return null
	}
	const date = new Date(dateStr)
	return `${date.getDate()} ${month[date.getMonth()]}`
}
