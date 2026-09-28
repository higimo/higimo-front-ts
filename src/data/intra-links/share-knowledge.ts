import { IntroLinkDataType } from 'utils.type'

import { EXTERNAL_LINKS } from 'dic/EXTERNAL_LINKS'
import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'

export const shareKnowledgeData: IntroLinkDataType[] = [
	{
		imgId: 'intersection',
		title: 'Пересечения',
		description: 'Творческое объединение крутанов. Коллабимся и делаем',
		href: EXTERNAL_LINKS.intersection,
	},
	{
		imgId: 'rak',
		title: 'Раковарня 2.0',
		description: 'Коллаб канал про пользу, мотивацию, дизайн, кодинг и музыку',
		href: EXTERNAL_LINKS.canalRak,
	},
	{
		imgId: 'tech',
		title: 'Техники → навыки → счастье',
		description: 'Дважды в неделю публикуем техники эффективной и счастливой жизни',
		href: EXTERNAL_LINKS.canalEfficient,
	},
	{
		imgId: 'tech',
		title: 'Сайт техник',
		description: 'Сайт с техниками. Каталогизированный и простой навигатор',
		href: EXTERNAL_LINKS.techIntersection,
	},
	{
		imgId: 'screen',
		title: 'Скриншотил',
		description: 'Единицы смысла на основе скриншотов',
		href: EXTERNAL_LINKS.canalScreen,
	},
	{
		imgId: 'obuchenie',
		title: 'Обучение',
		description: 'В 2017 году, я написал курс переподготовки по программированию и рассказал его в ННГУ',
		href: ROUTE_LINKS.learningIndex,
	},
	{
		imgId: 'faq',
		title: 'FAQ',
		href: ROUTE_LINKS.faqIndex,
		description: 'Чтобы не искать и компилировать ответ на сложный вопрос каждый раз, я собираю их в специальную копилку'
	},
] as const
