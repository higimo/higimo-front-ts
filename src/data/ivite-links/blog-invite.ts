import { LinkDataType } from 'utils.type'

import { EXTERNAL_LINK } from 'dic/route/EXTERNAL_LINK'
import { ROUTE_LINK } from 'dic/route/ROUTE_LINK'

export const BLOG_INVITE: LinkDataType[] = [
	{
		title: 'Личный блог Хигимо',
		href: EXTERNAL_LINK.socialTg,
		description: 'Делюсь опытом и держу в курсе новиной'
	},
	{
		title: 'Фотографии во ВКонтакте',
		href: EXTERNAL_LINK.socialVkPhoto,
		description: 'Выкладываю альбомы из городов, мест и событий так, чтоб можно было увидеть это моими глазами. Все фотографии подписаны, чтоб ничего не упустить'
	},
	{
		title: 'Продакт Кэмп Подкаст',
		href: EXTERNAL_LINK.productCampPodcast,
		description: 'Подкаст про продуктовый менеджмент от лидеров рынка'
	},
	{
		title: 'Личный блог',
		href: ROUTE_LINK.higimoBlog,
		description: 'Делюсь опытом и держу в курсе новиной'
	},
	{
		isArchive: true,
		title: 'Стена ВКонтакте',
		href: EXTERNAL_LINK.socialVk,
		description: '21 000 заметок с мыслями и переживаниями. Самое интересное по тегам <a href="https://vk.com/wall16174219?q=%23дизайн">#дизайн</a> <a href="https://vk.com/wall16174219?q=%23идея">#идея</a> <a href="https://vk.com/wall16174219?q=%23путешествие">#путешествие</a> <a href="https://vk.com/wall16174219?q=%23хорошо">#хорошо</a>'
	},
	{
		isArchive: true,
		title: 'Твиттер',
		href: EXTERNAL_LINK.socialTwitter,
		description: 'Багрепорты, шутки, полезные находки'
	},
	{
		isArchive: true,
		title: 'Посты в инсте',
		href: EXTERNAL_LINK.socialIg,
		description: 'Рассказываю, что делать программисту в России. Рассмотреть побег или покаллиграфить'
	},
	{
		isArchive: true,
		title: 'Сторисы в инсте',
		href: EXTERNAL_LINK.socialIg,
		description: 'Рассказываю про города, Ведьмака, дизайн, что крутого происходит в России, иногда репощу впечатляющее'
	},
	{
		isArchive: true,
		title: 'Флоу из глаз',
		href: EXTERNAL_LINK.socialTgView,
		description: 'Жизнь, которую я видел собственными глазами. И показал'
	},
	{
		isArchive: true,
		title: 'Хорошие новости',
		href: EXTERNAL_LINK.goodNews,
		description: 'Рассказываем позитивные новости о мире, России, технологиях, дизайне и прочем'
	},
] as const
