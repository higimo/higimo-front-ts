// TODO: [HARD] надо доработать функцию, чтоб брала данные из localStorage по ключу
/**
 * Отдаёт данные для формы для defaultValues
 */
export const getRememberedValues = <T,>(): Partial<T> | null => {
	// потом: return JSON.parse(localStorage.getItem('meeting-draft') || 'null')
	// @ts-ignore TODO: [HARD] пора избавляться от игноров
	return { title: 'remembered value' }
}
