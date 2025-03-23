export const makeHashTable = (arr, column) => {
	let res = {}
	arr.forEach(i => res[i[column]] = i)
	return res
}
