export const urlFormatter = config => element => {
	return {
		...element,
		href: config.mask.replace(`%${config.urlKey}%`, element[config.urlKey])
	}
}
