import { IntroLinkDataType } from 'utils.type'

import { EXTERNAL_LINK } from 'dic/route/EXTERNAL_LINK'
import { ROUTE_LINK } from 'dic/route/ROUTE_LINK'

export const KNOWLEDGE_INVITE: IntroLinkDataType[] = [
	{
		imgId: 'intersection',
		title: 'Пересечения',
		description: 'Творческое объединение крутанов. Коллабимся и делаем',
		href: EXTERNAL_LINK.intersection,
	},
	{
		imgId: 'rak',
		title: 'Раковарня 2.0',
		description: 'Коллаб канал про пользу, мотивацию, дизайн, кодинг и музыку',
		href: EXTERNAL_LINK.canalRak,
	},
	{
		imgId: 'tech',
		title: 'Техники → навыки → счастье',
		description: 'Дважды в неделю публикуем техники эффективной и счастливой жизни',
		href: EXTERNAL_LINK.canalEfficient,
	},
	{
		imgId: 'tech',
		title: 'Сайт техник',
		description: 'Сайт с техниками. Каталогизированный и простой навигатор',
		href: EXTERNAL_LINK.techIntersection,
	},
	{
		imgId: 'screen',
		title: 'Скриншотил',
		description: 'Единицы смысла на основе скриншотов',
		href: EXTERNAL_LINK.canalScreen,
	},
	{
		imgId: 'obuchenie',
		title: 'Обучение',
		description: 'В 2017 году, я написал курс переподготовки по программированию и рассказал его в ННГУ',
		href: ROUTE_LINK.learningIndex,
	},
	{
		imgId: 'faq',
		title: 'FAQ',
		href: ROUTE_LINK.faqIndex,
		description: 'Чтобы не искать и компилировать ответ на сложный вопрос каждый раз, я собираю их в специальную копилку'
	},
] as const
