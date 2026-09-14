import { EXTERNAL_LINKS } from 'dic/EXTERNAL_LINKS'
import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'
import { ToolDataType } from 'utils.type'

// TODO: вынести в src/data и объединить с другими
export const funnyList: ToolDataType[] = [
	{
		name: '🕑 Калькулятор времени',
		href: EXTERNAL_LINKS.serviceTimer,
		description: 'Когда нужно подсчитать сколько времени ушло в дне'
	},
	{
		name: 'Комоджи (⌐■_■)',
		href: ROUTE_LINKS.toolComoji,
		description: 'Смайлики на случай важных переговоров'
	},
	{
		name: 'Волшебный шар',
		href: ROUTE_LINKS.toolMagic,
		description: 'Когда особенно хочется погадать'
	},
	{
		name: 'Календарь деплоя',
		href: EXTERNAL_LINKS.serviceDeploy,
		description: 'Астрологи предсказали, когда лучше попридержать публикацию, и не гневать богов'
	},
	{
		name: "Настольные игры",
		href: ROUTE_LINKS.gameIndex,
		description: "Настолки, которые есть внутри моей компании, когда хочется поиграть, чтоб не спрашивать что ещё есть."
	},
	{
		name: "Аккорды",
		href: ROUTE_LINKS.accordIndex,
		description: "Песни, которые я играю на гитарниках, чтобы было понятно чему можно подпеть или какой будет репертуар с моей стороны"
	},
] as const
