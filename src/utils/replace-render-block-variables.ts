/**
 * Заменяет все плейсхолдеры вида {КЛЮЧ} в строке на соответствующие значения из объекта variables.
 * Если переменная не найдена, плейсхолдер остаётся без изменений.
 *
 * @param text - исходная строка, содержащая плейсхолдеры
 * @param variables - объект с переменными (ключ → значение)
 * @returns строка с подставленными значениями
 */
export const replaceRenderBlockVariables = (
	text: string,
	variables: Record<string, string> = {}
): string => {
	return text.replace(/\{%([^}]+)%\}/g, (match, key) => {
		const value = variables[key];
		return value !== undefined ? value : match;
	});
};
