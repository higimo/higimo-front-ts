type FormatterConfig = {
	urlKey: string
	mask: string
}

type ElementType = any

// TODO: [MEDIUM] подозрительно напоминает componentUrlFormatter
export const urlFormatter = (config: FormatterConfig) => (element: ElementType) => {
	return {
		...element,
		href: config.mask.replace(`%${config.urlKey}%`, element[config.urlKey])
	}
}
