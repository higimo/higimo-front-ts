/**
 * Вычисляет медиану массива чисел (средний в отсортированном)
 *
 * @param arr Массив чисел, пустому вернёт 0
 * @returns Медиана переданного массива
 *
 * @example
 * median([3, 1, 2])    // 2
 * median([1, 2, 3, 4]) // 2.5
 * median([])           // 0
 */
export const median = (arr: number[]): number => {
	if (arr.length === 0) {
		return 0
	}

	const mid = Math.floor(arr.length / 2)
	const nums = arr.concat().sort((a, b) => a - b)

	if (arr.length % 2 !== 0) {
		return nums[mid] as number
	}

	return ((nums[mid - 1] as number) + (nums[mid] as number)) / 2
}
