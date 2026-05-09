type ConfigType = {
	urlKey: string
	mask: string
}
type ComponentUrlFormatterType = (config: ConfigType) => (code: string) => string
export const componentUrlFormatter: ComponentUrlFormatterType = config => code => {
	return config.mask.replace(`%${config.urlKey}%`, code)
}
