// TODO: надо доработать функцию
export const getRememberedValues = <T,>(): Partial<T> | null => {
	// потом: return JSON.parse(localStorage.getItem('meeting-draft') || 'null')
	// @ts-ignore
	return { title: 'remembered value' };
};
