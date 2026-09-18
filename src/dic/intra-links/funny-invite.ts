import { EXTERNAL_LINKS } from 'dic/EXTERNAL_LINKS'
import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'
import { ToolDataType } from 'utils.type'

export const funnyList: ToolDataType[] = [
	{
		title: 'Комоджи (⌐■_■)',
		href: ROUTE_LINKS.comoji,
		description: 'Смайлики на случай важных переговоров'
	},
	{
		title: 'Волшебный шар',
		href: ROUTE_LINKS.magic,
		description: 'Когда особенно хочется погадать'
	},
	{
		title: 'Календарь деплоя',
		href: EXTERNAL_LINKS.serviceDeploy,
		description: 'Астрологи предсказали, когда лучше попридержать публикацию, и не гневать богов'
	},
	{
		title: 'Аккорды',
		href: ROUTE_LINKS.accordIndex,
		description: 'Песни, которые я играю на гитарниках, чтобы было понятно чему можно подпеть или какой будет репертуар с моей стороны'
	},
] as const
