import { ROUTE_LINKS } from 'dic/ROUTE_LINKS';

// TODO: [MEDIUM] Добавить общий словарь роутов страниц и сделать галереи-карточек, как на главной хотя бы
// https://www.tema.ru/travel/
export const data = [
	{
		href: ROUTE_LINKS.tourismMapsMoscowWalkaround,
		title: 'Проект обхожу Москву',
	},
	{
		href: ROUTE_LINKS.tourismMapsMoscowBar,
		title: 'Московские бары',
	},
	{
		href: ROUTE_LINKS.tourismMapsRegion,
		title: 'Посещённые регионы России',
	},
] as const;
