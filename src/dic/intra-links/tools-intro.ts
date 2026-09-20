import { IntroLinkDataType } from 'utils.type'

import { EXTERNAL_LINKS } from 'dic/EXTERNAL_LINKS'
import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'

export const hardToolList: IntroLinkDataType[] = [
	{
		isAdmin: true,
		title: 'Пробби',
		href: ROUTE_LINKS.petProject,
		description: 'Список проектов, которыми я занят'
	},
	{
		isAdmin: true,
		title: 'Нокиа',
		href: ROUTE_LINKS.nokiaIndex,
		description: 'Менеджмент своих коннектов с людьми'
	},
	{
		isAdmin: true,
		title: 'Пинарик',
		href: ROUTE_LINKS.nokiaPinarik,
		description: 'Отслеживание своего довольства работая в календаре-хитмапе'
	},
	{
		title: 'Путешествия',
		href: ROUTE_LINKS.tourismIndex,
		description: 'Собираю инфу про свои путешествия, где был, какие города понравились, куда ходить'
	},
	{
		isAdmin: true,
		title: '✉ Эмайлер',
		href: ROUTE_LINKS.emailer,
		description: 'Пошлёт на почту страницу интернета, чтобы прочитать в статью в удобном месте, даже без интернета',
	},
	{
		isAdmin: true,
		title: 'RSS-читалка на почту',
		href: ROUTE_LINKS.TODO,
		description: 'Подписываешься здесь — получаешь на почту',
	},
	{
		title: 'Список списков',
		href: ROUTE_LINKS.listListMain,
		description: 'Когда мания каталогизации становится слишком сильной, можно составлять списки из всего, что попадётся под руку'
	},
	{
		title: 'Свиби',
		href: EXTERNAL_LINKS.sweebe,
		description: 'Менеджмент своих коннектов с людьми'
	},
	{
		title: '🖼 Фотографии во ВКонтакте',
		href: ROUTE_LINKS.toolVkIndex,
		description: 'Для удобной подписи и сортировки фотографий, используя всё пространство монитора, вместо узкой колонки оригинала'
	},
	{
		title: '🕑 Калькулятор времени',
		href: EXTERNAL_LINKS.serviceTimer,
		description: 'Когда нужно подсчитать сколько времени ушло в дне'
	},
	{
		isAdmin: true,
		title: 'Прон',
		href: ROUTE_LINKS.pron,
		description: 'Ну ты понел'
	},
	{
		isAdmin: true,
		title: 'Демагог',
		href: ROUTE_LINKS.demagog,
		description: 'Справочник по демагогическим приёмам'
	},
] as const

export const botToolList: IntroLinkDataType[] = [
	{
		title: 'Бот упоминаний',
		href: EXTERNAL_LINKS.botRole,
		description: 'Упоминать в телеге несколько людей в стиле <code>@all</code> <code>@designer</code>. <a href="/project/bots/bot-mentions/">Анонс</a>'
	},
	{
		title: '🪆 Бот трёх заданий',
		href: EXTERNAL_LINKS.botDoll,
		description: 'Концентрироваться только на трёх заданиях. <a href="/project/bots/bot-of-three-tasks/">Анонс</a>'
	},
] as const

export const toolListData: IntroLinkDataType[] = ([] as IntroLinkDataType[])
	.concat(botToolList)
	.concat(hardToolList)
