import { EXTERNAL_LINKS } from "../../../dic/EXTERNAL_LINKS";
import { ROUTE_LINKS } from "../../../dic/ROUTE_LINKS";

export type AboutDataType = {
	name: string;
	link: string;
	description: string;
}

export const aboutInviteList: AboutDataType[] = [
	{
		name: "Мои вещи",
		link: ROUTE_LINKS.thingsIndex,
		description: "Штуки, которые я использую в повседневной жизни"
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
		name: "Избранный ютуб",
		link: ROUTE_LINKS.youtube,
		description: "Избранные ссылки"
	},
	{
		name: "FAQ",
		link: ROUTE_LINKS.faqIndex,
		description: "Чтобы не искать и компилировать ответ на сложный вопрос каждый раз, я собираю их в специальную копилку"
	},
	{
		name: "Мои вещички",
		link: ROUTE_LINKS.thingsIndex,
		description: "Перепись предметов, чтобы не отсматривать их каждый раз"
	},
	{
		name: "Резюме",
		link: ROUTE_LINKS.resumeIndex,
		description: "На случай важных переговоров"
	},
	{
		name: "Библиотека",
		link: ROUTE_LINKS.libraryIndex,
		description: "Книг многовато, чтобы случайно не купить повтор — переписал их"
	},
	{
		name: 'Багрепорты',
		link: ROUTE_LINKS.feedbackIndex,
		description: 'Багрепорты, чтобы показать безболезненность и необходимость обратной связи. С ошибками не стоит мириться — о них стоит говорить.'
	},
	{
		name: "Оценка городов",
		link: ROUTE_LINKS.tourismCityIndex,
		description: "Города где был, оцениваю по собственной системе"
	},
	{
		name: "Список желаний",
		link: EXTERNAL_LINKS.wishlist,
		description: "Всё есть, подарков не нужно. Но вдруг когда-то сюда добавлю"
	},
] as const
