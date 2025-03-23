import { EXTERNAL_LINKS } from "../../../dic/EXTERNAL_LINKS";
import { ROUTE_LINKS } from "../../../dic/ROUTE_LINKS";

export const shareKnowledgeData = [
	{
		imgId: "rak",
		title: "Раковарня 2.0",
		description: "Коллаб канал про пользу, мотивацию, дизайн, кодинг и музыку.",
		link: EXTERNAL_LINKS.canalRak,
	},
	{
		imgId: "tech",
		title: "Техники → навыки → счастье",
		description: "Дважды в неделю публикуем техники эффективной и счастливой жизни.",
		link: EXTERNAL_LINKS.canalEfficient,
	},
	{
		imgId: "screen",
		title: "Скриншотил",
		description: "Единицы смысла на основе скриншотов",
		link: EXTERNAL_LINKS.canalScreen,
	},
	{
		imgId: "school",
		title: "Школа Ватриковского",
		description: "Рассказываем, как не надламываясь и не выгорая делать дела. О лекциях сообщаем в телеге",
		isArchive: true,
	},
	{
		imgId: "obuchenie",
		title: "Обучение",
		description: "В 2017 году, я написал курс переподготовки по программированию и рассказал его в ННГУ.",
		link: ROUTE_LINKS.learningIndex,
	},
] as const
