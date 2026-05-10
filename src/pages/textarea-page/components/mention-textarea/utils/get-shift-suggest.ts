export const getShiftSuggest = (currentIndex: number, position: -1 | 1, arr: any[]) => {
	if (arr.length === 0) {
		return -1
	}

	let newIndex = currentIndex + position
	if (newIndex < 0) {
		newIndex = arr.length - 1
	} else if (newIndex >= arr.length) {
		newIndex = 0
	}

	return newIndex
}
