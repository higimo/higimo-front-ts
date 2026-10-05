// TODO: [LIGHT] надо доработать функцию
export const getRememberedValues = <T,>(): Partial<T> | null => {
	// потом: return JSON.parse(localStorage.getItem('meeting-draft') || 'null')
	// @ts-ignore TODO: [MIDDLE] пора избавляться от игноров
	return { title: 'remembered value' };
};
