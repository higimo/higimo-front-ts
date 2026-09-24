/**
 * Отдаёт в русском стиле 31.12.2026
 */
export const formatDate = (dateStr: string) => {
	const d = new Date(dateStr)
	return d.toLocaleDateString('ru-RU', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric'
	})
}
