const month = 'января,февраля,марта,апреля,мая,июня,июля,августа,сентября,октября,ноября,декабря'.split(',')

export const getDate = (dateStr = null) => {
	const date = new Date(dateStr)
	return `${date.getDate()} ${month[date.getMonth()]}`
}
