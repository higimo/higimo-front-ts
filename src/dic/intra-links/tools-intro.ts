import { ToolDataType } from 'utils.type'

import { EXTERNAL_LINKS } from 'dic/EXTERNAL_LINKS'
import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'

// TODO: вынести в src/data и объединить с другими
export const hardToolList: ToolDataType[] = [
	{
		name: 'Пробби',
		href: ROUTE_LINKS.petProject,
		description: 'Список проектов, которыми я занят'
	},
	{
		name: 'Список списков',
		href: ROUTE_LINKS.listListIndex,
		description: 'Когда мания каталогизации становится слишком сильной, можно составлять списки из всего, что попадётся под руку'
	},
	{
		name: 'Нокиа',
		isAdmin: true,
		href: ROUTE_LINKS.nokiaIndex,
		description: 'Менеджмент своих коннектов с людьми'
	},
	{
		name: 'Свиби',
		href: EXTERNAL_LINKS.sweebe,
		description: 'Менеджмент своих коннектов с людьми'
	},
	{
		name: 'Пинарик',
		isAdmin: true,
		href: ROUTE_LINKS.nokiaPinarik,
		description: 'Отслеживание своего довольства работая в календаре-хитмапе'
	},
	{
		name: 'Путешествия',
		isAdmin: true,
		href: ROUTE_LINKS.tourismIndex,
		description: 'Собираю инфу про свои путешествия, где был, какие города понравились, куда ходить'
	},
	{
		name: '🖼 Фотографии во ВКонтакте',
		href: ROUTE_LINKS.toolVkIndex,
		description: 'Для удобной подписи и сортировки фотографий, используя всё пространство монитора, вместо узкой колонки оригинала'
	},
	{
		isAdmin: true,
		name: '✉ Эмайлер',
		href: ROUTE_LINKS.emailer,
		description: 'Пошлёт на почту страницу интернета, чтобы прочитать в статью в удобном месте, даже без интернета',
	},
	{
		isAdmin: true,
		name: 'RSS-читалка на почту',
		href: ROUTE_LINKS.TODO,
		description: 'Подписываешься здесь — получаешь на почту',
	},
] as const

export const unfinishedToolList: ToolDataType[] = [
	{
		name: 'Прон',
		isAdmin: true,
		href: ROUTE_LINKS.pron,
		description: 'Ну ты понел'
	},
	{
		name: 'Демагог',
		isAdmin: true,
		href: ROUTE_LINKS.demagog,
		description: 'Справочник по демагогическим приёмам'
	},
] as const

export const botToolList: ToolDataType[] = [
	{
		name: 'Бот упоминаний',
		href: EXTERNAL_LINKS.botRole,
		description: 'Упоминать в телеге несколько людей в стиле <code>@all</code> <code>@designer</code>. <a href="/project/bots/bot-mentions/">Анонс</a>'
	},
	{
		name: '🪆 Бот трёх заданий',
		href: EXTERNAL_LINKS.botDoll,
		description: 'Концентрироваться только на трёх заданиях. <a href="/project/bots/bot-of-three-tasks/">Анонс</a>'
	},
] as const

export const toolListData: ToolDataType[] = ([] as ToolDataType[])
	.concat(hardToolList)
	.concat(unfinishedToolList)
	.concat(botToolList)
	.concat([
		{
			name: "☝ Логизмы",
			href: ROUTE_LINKS.logism,
			description: "Цитаты друзей, знаменитостей, чтобы помнить и направлять себя"
		},
	])
