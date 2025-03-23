import { EXTERNAL_LINKS } from "../../../dic/EXTERNAL_LINKS";

type BlogListType = {
	isArhive?: boolean;
	name: string;
	link: string;
	description: string;
}

export const blogInviteData: BlogListType[] = [
	{
		name: 'Стена ВКонтакте',
		link: EXTERNAL_LINKS.socialVk,
		description: '21 000 заметок с мыслями и переживаниями. Самое интересное по тегам <a href="https://vk.com/wall16174219?q=%23дизайн">#дизайн</a> <a href="https://vk.com/wall16174219?q=%23идея">#идея</a> <a href="https://vk.com/wall16174219?q=%23путешествие">#путешествие</a> <a href="https://vk.com/wall16174219?q=%23хорошо">#хорошо</a>.'
	},
	{
		name: 'Фотографии во ВКонтакте',
		link: EXTERNAL_LINKS.socialVkPhoto,
		description: 'Выкладываю альбомы из городов, мест и событий так, чтоб можно было увидеть это моими глазами. Все фотографии подписаны, чтоб ничего не упустить.'
	},
	{
		name: 'Багрепорты',
		link: EXTERNAL_LINKS.feedBack,
		description: 'Багрепорты, чтобы показать безболезненность и необходимость обратной связи. С ошибками не стоит мириться — о них стоит говорить.'
	},
	{
		name: 'Тележка Хигимо',
		link: EXTERNAL_LINKS.socialTg,
		description: 'Рассказываю кулстори, про города, дизайн, что классного происходит, исследую.'
	},
	{
		isArhive: true,
		name: 'Твиттер',
		link: EXTERNAL_LINKS.socialTwitter,
		description: 'Багрепорты, шутки, полезные находки.'
	},
	{
		isArhive: true,
		name: 'Посты в инсте',
		link: EXTERNAL_LINKS.socialIg,
		description: 'Рассказываю, что делать программисту в России. Рассмотреть побег или покаллиграфить'
	},
	{
		isArhive: true,
		name: 'Сторисы в инсте',
		link: EXTERNAL_LINKS.socialIg,
		description: 'Рассказываю про города, Ведьмака, дизайн, что крутого происходит в России, иногда репощу впечатляющее.'
	}
] as const
