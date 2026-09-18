import { ToolDataType } from 'utils.type'

import { EXTERNAL_LINKS } from 'dic/EXTERNAL_LINKS'

export const blogInviteData: ToolDataType[] = [
	{
		title: 'Личный блог Хигимо',
		href: EXTERNAL_LINKS.socialTg,
		description: 'Делюсь опытом и держу в курсе новиной'
	},
	{
		title: 'Фотографии во ВКонтакте',
		href: EXTERNAL_LINKS.socialVkPhoto,
		description: 'Выкладываю альбомы из городов, мест и событий так, чтоб можно было увидеть это моими глазами. Все фотографии подписаны, чтоб ничего не упустить'
	},
	{
		isArchive: true,
		title: 'Стена ВКонтакте',
		href: EXTERNAL_LINKS.socialVk,
		description: '21 000 заметок с мыслями и переживаниями. Самое интересное по тегам <a href="https://vk.com/wall16174219?q=%23дизайн">#дизайн</a> <a href="https://vk.com/wall16174219?q=%23идея">#идея</a> <a href="https://vk.com/wall16174219?q=%23путешествие">#путешествие</a> <a href="https://vk.com/wall16174219?q=%23хорошо">#хорошо</a>'
	},
	{
		isArchive: true,
		title: 'Твиттер',
		href: EXTERNAL_LINKS.socialTwitter,
		description: 'Багрепорты, шутки, полезные находки'
	},
	{
		isArchive: true,
		title: 'Посты в инсте',
		href: EXTERNAL_LINKS.socialIg,
		description: 'Рассказываю, что делать программисту в России. Рассмотреть побег или покаллиграфить'
	},
	{
		isArchive: true,
		title: 'Сторисы в инсте',
		href: EXTERNAL_LINKS.socialIg,
		description: 'Рассказываю про города, Ведьмака, дизайн, что крутого происходит в России, иногда репощу впечатляющее'
	},
	{
		isArchive: true,
		title: 'Флоу из глаз',
		href: EXTERNAL_LINKS.socialTgView,
		description: 'Жизнь, которую я видел собственными глазами. И показал'
	},
] as const
