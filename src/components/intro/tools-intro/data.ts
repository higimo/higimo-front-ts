import { EXTERNAL_LINKS } from 'dic/EXTERNAL_LINKS'
import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'

export type ToolDataType = {
	name: string
	isAdmin?: boolean,
	link: typeof EXTERNAL_LINKS[keyof typeof EXTERNAL_LINKS] | typeof ROUTE_LINKS[keyof typeof ROUTE_LINKS]
	description: string
}

export const hardToolList: ToolDataType[] = [
	{
		name: 'Пробби',
		link: ROUTE_LINKS.petProject,
		description: 'Список проектов, которыми я занят'
	},
	{
		name: 'Список списков',
		link: ROUTE_LINKS.listListIndex,
		description: 'Когда мания каталогизации становится слишком сильной, можно составлять списки из всего, что попадётся под руку'
	},
	{
		name: 'Нокиа',
		isAdmin: true,
		link: ROUTE_LINKS.nokiaIndex,
		description: 'Менеджмент своих коннектов с людьми'
	},
	{
		name: 'Путешествия',
		isAdmin: true,
		link: ROUTE_LINKS.tourismIndex,
		description: 'Собираю инфу про свои путешествия, где был, какие города понравились, куда ходить'
	},
	{
		name: '🖼 Фотографии во ВКонтакте',
		link: ROUTE_LINKS.toolVkIndex,
		description: 'Для удобной подписи и сортировки фотографий, используя всё пространство монитора, вместо узкой колонки оригинала'
	},
] as const

export const unfinishedToolList: ToolDataType[] = [
	{
		name: 'Прон',
		isAdmin: true,
		link: ROUTE_LINKS.pron,
		description: 'Ну ты понел'
	},
	{
		name: 'Демагог',
		isAdmin: true,
		link: ROUTE_LINKS.demagog,
		description: 'Справочник по демагогическим приёмам'
	},
	{
		name: 'Пинарик',
		isAdmin: true,
		link: ROUTE_LINKS.nokiaPinarik,
		description: 'Отслеживание своего довольства работая в календаре-хитмапе'
	},
] as const

export const crashedToolList: ToolDataType[] = [
	// {
	// 	name: '✉ Эмайлер',
	// 	link: ROUTE_LINKS.toolEmailer,
	// 	description: 'Пошлёт на почту страницу интернета, чтобы прочитать в статью в удобном месте, даже без интернета'
	// },
	// {
	// 	name: 'RSS-читалка на почту',
	// 	description: 'Подписываешься здесь — получаешь на почту'
	// }
] as const

export const botToolList: ToolDataType[] = [
	{
		name: 'Бот упоминаний',
		link: EXTERNAL_LINKS.botRole,
		description: 'Упоминать в телеге несколько людей в стиле <code>@all</code> <code>@designer</code>. <a href="/project/bots/bot-mentions/">Анонс</a>'
	},
	{
		name: '🪆 Бот трёх заданий',
		link: EXTERNAL_LINKS.botDoll,
		description: 'Концентрироваться только на трёх заданиях. <a href="/project/bots/bot-of-three-tasks/">Анонс</a>'
	},
] as const

export const toolListData: ToolDataType[] = [
	...hardToolList,
	...unfinishedToolList,
	...crashedToolList,
	...botToolList,
	{
		name: "☝ Логизмы",
		link: ROUTE_LINKS.logism,
		description: "Цитаты друзей, знаменитостей, чтобы помнить и направлять себя"
	},
] as const
