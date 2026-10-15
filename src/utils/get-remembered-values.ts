// TODO: [HARD] надо доработать функцию, чтоб брала данные из localStorage по ключу
// Продумать, как должна работать система ключей, чтобы если редактировался определённый id,
// то показывает именно те изменения. Если полностью новая сущность — вставляет её
// Если в компоненте не надо запоминать состояние — просто не указывать функцию?

/**
 * Отдаёт данные для формы для defaultValues
 */
export const getRememberedValues = <T,>(): Partial<T> | null => {
	// потом: return JSON.parse(localStorage.getItem('meeting-draft') || 'null')
	// @ts-ignore TODO: [HARD] пора избавляться от игноров
	return { title: 'remembered value' }
}
