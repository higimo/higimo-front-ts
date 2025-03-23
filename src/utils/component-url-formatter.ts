type ConfigType = {
	urlKey: string;
	mask: string;
}
type ComponentUrlFormatterType = (ConfigType) => ({}) => string
export const componentUrlFormatter: ComponentUrlFormatterType = config => code => {
	return config.mask.replace(`%${config.urlKey}%`, code)
}
