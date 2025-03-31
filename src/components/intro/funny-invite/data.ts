import { EXTERNAL_LINKS } from "../../../dic/EXTERNAL_LINKS";
import { ROUTE_LINKS } from "../../../dic/ROUTE_LINKS";

export type FunnyDataType = {
	name: string;
	link: string;
	description: string;
}

export const funnyList: FunnyDataType[] = [
	{
		name: '🕑 Калькулятор времени',
		link: EXTERNAL_LINKS.serviceTimer,
		description: 'Когда нужно подсчитать сколько времени ушло в дне'
	},
	{
		name: 'Комоджи (⌐■_■)',
		link: ROUTE_LINKS.toolComoji,
		description: 'Смайлики на случай важных переговоров'
	},
	{
		name: 'Волшебный шар',
		link: ROUTE_LINKS.toolMagic,
		description: 'Когда особенно хочется погадать'
	},
	{
		name: 'Календарь деплоя',
		link: EXTERNAL_LINKS.serviceDeploy,
		description: 'Астрологи предсказали, когда лучше попридержать публикацию, и не гневать богов'
	},
	{
		name: "Настольные игры",
		link: ROUTE_LINKS.gameIndex,
		description: "Настолки, которые есть внутри моей компании, когда хочется поиграть, чтоб не спрашивать что ещё есть."
	},
	{
		name: "Аккорды",
		link: ROUTE_LINKS.accordIndex,
		description: "Песни, которые я играю на гитарниках, чтобы было понятно чему можно подпеть или какой будет репертуар с моей стороны"
	},
] as const
