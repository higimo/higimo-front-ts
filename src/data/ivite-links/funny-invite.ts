import { EXTERNAL_LINK } from 'dic/route/EXTERNAL_LINK'
import { ROUTE_LINK } from 'dic/route/ROUTE_LINK'
import { IntroLinkDataType } from 'utils.type'

export const FUNNY_INVITE: IntroLinkDataType[] = [
	{
		title: 'Комоджи (⌐■_■)',
		href: ROUTE_LINK.comoji,
		description: 'Смайлики на случай важных переговоров'
	},
	{
		title: 'Волшебный шар',
		href: ROUTE_LINK.magic,
		description: 'Когда особенно хочется погадать'
	},
	{
		title: 'Календарь деплоя',
		href: EXTERNAL_LINK.serviceDeploy,
		description: 'Астрологи предсказали, когда лучше попридержать публикацию, и не гневать богов'
	},
	{
		title: 'Аккорды',
		href: ROUTE_LINK.accordIndex,
		description: 'Песни, которые я играю на гитарниках, чтобы было понятно чему можно подпеть или какой будет репертуар с моей стороны'
	},
] as const
