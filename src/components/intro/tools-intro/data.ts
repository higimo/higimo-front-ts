import { EXTERNAL_LINKS } from "../../../dic/EXTERNAL_LINKS";
import { ROUTE_LINKS } from "../../../dic/ROUTE_LINKS";

export const toolsData = [
	{
		name: '🕑 Калькулятор времени',
		link: EXTERNAL_LINKS.serviceTimer,
		description: 'Когда нужно подсчитать сколько времени ушло в дне'
	},
	{
		name: 'Комоджи (⌐■_■)',
		link: ROUTE_LINKS.toolComoji,
		description: 'Смайлики на случай важных переговоров'
	},
	{
		name: '🖼 Фотографии во ВКонтакте',
		link: ROUTE_LINKS.toolVkIndex,
		description: 'Для удобной подписи и сортировки фотографий, используя всё пространство монитора, вместо узкой колонки оригинала'
	},
	{
		name: '✉ Эмайлер',
		link: ROUTE_LINKS.toolEmailer,
		description: 'Пошлёт на почту страницу интернета, чтобы прочитать в статью в удобном месте, даже без интернета'
	},
	{
		name: 'Волшебный шар',
		link: ROUTE_LINKS.toolMagic,
		description: 'Когда особенно хочется погадать'
	},
	{
		name: 'Пробби',
		link: ROUTE_LINKS.petProject,
		description: 'Список проектов, которыми я занят'
	},
	{
		name: 'Список списков',
		link: ROUTE_LINKS.listListIndex,
		description: 'Когда мания каталогизации становится слишком сильной, можно составлять списки из всего, что попадётся под руку'
	},
	{
		name: 'Календарь деплоя',
		link: EXTERNAL_LINKS.serviceDeploy,
		description: 'Астрологи предсказали, когда лучше попридержать публикацию, и не гневать богов'
	},
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
	{
		name: 'RSS-читалка на почту',
		description: 'Подписываешься здесь — получаешь на почту'
	}	
] as const
