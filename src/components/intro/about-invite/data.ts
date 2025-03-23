import { EXTERNAL_LINKS } from "../../../dic/EXTERNAL_LINKS";
import { ROUTE_LINKS } from "../../../dic/ROUTE_LINKS";

export const aboutInviteList = [
	{
		name: "Мои вещи",
		link: ROUTE_LINKS.thingsIndex,
		description: "Штуки, которые я использую в повседневной жизни"
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
	{
		name: "Список желаний",
		link: EXTERNAL_LINKS.wishlist,
		description: "Если думаете, что мне подарить — есть пара идей"
	},
	{
		name: "Кинолог",
		link: ROUTE_LINKS.cinemaIndex,
		description: "Кусочки сценария, которые меня особенно зацепили. Например, неожиданный фашизм внутри «Звёздного десанта»"
	},
	{
		name: "Избранные ссылки",
		link: ROUTE_LINKS.links,
		description: "Ссылки, важнейшее в интернете"
	},
	{
		name: "Ютуб",
		link: ROUTE_LINKS.youtube,
		description: "Избранные ссылки"
	},
	{
		name: "FAQ",
		link: ROUTE_LINKS.faqIndex,
		description: "Чтобы не искать и компилировать ответ на сложный вопрос каждый раз, я собираю их в специальную копилку"
	}
] as const
