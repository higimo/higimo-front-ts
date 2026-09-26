/**
 * Исключает ключи из объекта
 *
 * @param obj - Исходный объект
 * @param keys - Ключи для исключения
 * @returns Новый объект без указанных ключей
 *
 * @example
 * const user = { id: 1, name: 'John', password: '123', email: 'john@example.com' }
 * const safeUser = omit(user, 'password')
 * // Результат: { id: 1, name: 'John', email: 'john@example.com' }
 *
 * @example
 * const data = { a: 1, b: 2, c: 3, d: 4 }
 * const result = omit(data, 'b', 'd')
 * // Результат: { a: 1, c: 3 }
 */

export const omit = <T extends Record<string, any>, K extends keyof T>(
	obj: T,
	...keys: K[]
): Omit<T, K> => {
	const keysToRemove = new Set(keys);
	return Object.fromEntries(
		Object.entries(obj).filter(([key]) => !keysToRemove.has(key as K))
	) as Omit<T, K>;
};
