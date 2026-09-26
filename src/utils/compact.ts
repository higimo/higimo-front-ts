/**
 * Удаляет все пустые значения из объекта
 * Пустыми считаются: null, undefined, '', [], {}
 *
 * @param obj - Исходный объект
 * @returns Новый объект без пустых значений
 *
 * @example
 * compact({ a: 1, b: null, c: '', d: [], e: {} })
 * // Результат: { a: 1 }
 */

export const compact = <T extends Record<string, any>>(obj: T): Partial<T> => {
	return Object.fromEntries(
		Object.entries(obj).filter(([_, value]) => {
			// Проверяем на null и undefined
			if (value == null) return false;

			// Проверяем на пустую строку
			if (typeof value === 'string' && value.trim() === '') return false;

			// Проверяем на пустой массив
			if (Array.isArray(value) && value.length === 0) return false;

			// Проверяем на пустой объект
			if (typeof value === 'object' && !Array.isArray(value) && value.constructor === Object) {
				return Object.keys(value).length > 0;
			}

			return true;
		})
	) as Partial<T>;
};
