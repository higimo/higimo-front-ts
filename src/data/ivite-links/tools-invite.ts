import { LinkDataType } from 'utils.type'

import { EXTERNAL_LINK } from 'dic/route/EXTERNAL_LINK'
import { ROUTE_LINK } from 'dic/route/ROUTE_LINK'

const TOOL_INVITE: LinkDataType[] = [
	{
		isAdmin: true,
		title: 'Пробби',
		href: ROUTE_LINK.petProject,
		description: 'Список проектов, которыми я занят'
	},
	{
		isAdmin: true,
		title: 'Нокиа',
		href: ROUTE_LINK.nokiaIndex,
		description: 'Менеджмент своих коннектов с людьми'
	},
	{
		isAdmin: true,
		title: 'Пинарик',
		href: ROUTE_LINK.nokiaPinarik,
		description: 'Отслеживание своего довольства работая в календаре-хитмапе'
	},
	{
		title: 'Путешествия',
		href: ROUTE_LINK.tourismIndex,
		description: 'Собираю инфу про свои путешествия, где был, какие города понравились, куда ходить'
	},
	{
		isAdmin: true,
		title: '✉ Эмайлер',
		href: ROUTE_LINK.emailer,
		description: 'Пошлёт на почту страницу интернета, чтобы прочитать в статью в удобном месте, даже без интернета',
	},
	{
		isAdmin: true,
		title: 'RSS-читалка на почту',
		href: ROUTE_LINK.TODO,
		description: 'Подписываешься здесь — получаешь на почту',
	},
	{
		title: 'Список списков',
		href: ROUTE_LINK.listListMain,
		description: 'Когда мания каталогизации становится слишком сильной, можно составлять списки из всего, что попадётся под руку'
	},
	{
		title: 'Свиби',
		href: EXTERNAL_LINK.sweebe,
		description: 'Менеджмент своих коннектов с людьми'
	},
	{
		title: '🖼 Фотографии во ВКонтакте',
		href: ROUTE_LINK.toolVkIndex,
		description: 'Для удобной подписи и сортировки фотографий, используя всё пространство монитора, вместо узкой колонки оригинала'
	},
	{
		title: '🕑 Калькулятор времени',
		href: EXTERNAL_LINK.serviceTimer,
		description: 'Когда нужно подсчитать сколько времени ушло в дне'
	},
	{
		isAdmin: true,
		title: 'Прон',
		href: ROUTE_LINK.pron,
		description: 'Ну ты понел'
	},
	{
		isAdmin: true,
		title: 'Демагог',
		href: ROUTE_LINK.demagog,
		description: 'Справочник по демагогическим приёмам'
	},
] as const

const botToolList: LinkDataType[] = [
	{
		title: 'Бот упоминаний',
		href: EXTERNAL_LINK.botRole,
		description: 'Упоминать в телеге несколько людей в стиле <code>@all</code> <code>@designer</code>. <a href="/project/bots/bot-mentions/">Анонс</a>'
	},
	{
		title: '🪆 Бот трёх заданий',
		href: EXTERNAL_LINK.botDoll,
		description: 'Концентрироваться только на трёх заданиях. <a href="/project/bots/bot-of-three-tasks/">Анонс</a>'
	},
] as const

export const toolListData: LinkDataType[] = ([] as LinkDataType[])
	.concat(botToolList)
	.concat(TOOL_INVITE)
