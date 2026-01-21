import { EXTERNAL_LINKS } from 'dic/EXTERNAL_LINKS'
import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'

export type KnowlageType = {
	isArchive?: boolean
	link?: string
	imgId: 'screen' | 'rak' | 'tech' | 'school' | 'obuchenie' | 'intersection'
	name: string
	description: string
}

export const shareKnowledgeData: KnowlageType[] = [
	{
		imgId: "intersection",
		name: "Пересечения",
		description: "Творческое объединение крутанов. Коллабимся и делаем.",
		link: EXTERNAL_LINKS.intersection,
	},
	{
		imgId: "rak",
		name: "Раковарня 2.0",
		description: "Коллаб канал про пользу, мотивацию, дизайн, кодинг и музыку.",
		link: EXTERNAL_LINKS.canalRak,
	},
	{
		imgId: "tech",
		name: "Техники → навыки → счастье",
		description: "Дважды в неделю публикуем техники эффективной и счастливой жизни.",
		link: EXTERNAL_LINKS.canalEfficient,
	},
	{
		imgId: "tech",
		name: "Сайт техник",
		description: "Сайт с техниками. Каталогизированный и простой навигатор",
		link: EXTERNAL_LINKS.techIntersection,
	},
	{
		imgId: "screen",
		name: "Скриншотил",
		description: "Единицы смысла на основе скриншотов",
		link: EXTERNAL_LINKS.canalScreen,
	},
	{
		imgId: "obuchenie",
		name: "Обучение",
		description: "В 2017 году, я написал курс переподготовки по программированию и рассказал его в ННГУ.",
		link: ROUTE_LINKS.learningIndex,
	},
	// {
	// 	imgId: "school",
	// 	name: "Школа Ватриковского",
	// 	description: "Рассказываем, как не надламываясь и не выгорая делать дела. О лекциях сообщаем в телеге",
	// 	link: EXTERNAL_LINKS.vatrikovskySchool,
	// 	isArchive: true,
	// },
] as const
