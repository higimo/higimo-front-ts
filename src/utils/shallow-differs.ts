const isInBlacklist = (blacklist = [], needle = '') => blacklist.includes(needle)

export const shallowDiffers = (a, b, blacklist) => {
	for (let key in a) {
		if (!isInBlacklist(blacklist, key) && a[key] !== b[key]) {
			return true
		}
	}

	for (let key in b) {
		if (!isInBlacklist(blacklist, key) && !(key in a)) {
			return true
		}
	}

	return false
}
