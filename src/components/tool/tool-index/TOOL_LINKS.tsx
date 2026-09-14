import { ToolDataType } from 'utils.type'

import { EXTERNAL_LINKS } from 'dic/EXTERNAL_LINKS'
import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'

// TODO: вынести в src/data и объединить с другими
export const TOOL_LINKS: ToolDataType[] = [
	{
		isAdmin: true,
		name: '✉ Эмайлер',
		href: ROUTE_LINKS.toolEmailer,
		description: 'Пошлёт на почту страницу интернета, чтобы прочитать в статью в удобном месте, даже без интернета',
	},
	{
		isAdmin: true,
		name: 'RSS-читалка на почту',
		href: ROUTE_LINKS.TODO,
		description: 'Подписываешься здесь — получаешь на почту',
	},
	{
		isAdmin: true,
		name: 'Пинарик',
		href: ROUTE_LINKS.nokiaPinarik,
		description: 'Отслеживание своего довольства работая в календаре-хитмапе'
	},
	{
		isAdmin: true,
		name: 'Прон',
		href: ROUTE_LINKS.pron,
		description: 'Ну ты понел'
	},
	{
		isAdmin: true,
		name: 'Нокиа',
		href: ROUTE_LINKS.nokiaIndex,
		description: 'Менеджмент своих коннектов с людьми'
	},
	{
		name: 'Свиби',
		href: EXTERNAL_LINKS.sweebe,
		description: 'Менеджмент своих коннектов с людьми'
	},
	{
		name: 'Путешествия',
		href: ROUTE_LINKS.tourismIndex,
		description: 'Собираю инфу про свои путешествия, где был, какие города понравились, куда ходить'
	},
	{
		name: 'Календарь деплоя',
		href: EXTERNAL_LINKS.serviceDeploy,
		description: 'Астрологи предсказали, когда лучше попридержать публикацию, и не гневать богов'
	},
	{
		name: 'Пет-проекты',
		href: ROUTE_LINKS.petProject,
		description: 'Список проектов, которыми я занят',
	},
	{
		name: 'Библиотека',
		href: ROUTE_LINKS.libraryIndex,
		description: 'Книг многовато, чтобы случайно не купить повтор — переписал их',
	},
	{
		name: "Оценка городов",
		href: ROUTE_LINKS.tourismCityIndex,
		description: "Города где был, оцениваю по собственной системе"
	},
	{
		name: "FAQ",
		href: ROUTE_LINKS.faqIndex,
		description: "Чтобы не искать и компилировать ответ на сложный вопрос каждый раз, я собираю их в специальную копилку"
	},
	{
		name: "Мои вещи",
		href: ROUTE_LINKS.thingsIndex,
		description: "Перепись предметов, чтобы не отсматривать их каждый раз"
	},
	{
		name: "Кинолог",
		href: ROUTE_LINKS.cinemaIndex,
		description: "Кусочки сценария, которые меня особенно зацепили. Например, неожиданный фашизм внутри «Звёздного десанта»"
	},
	{
		name: "Избранные ссылки",
		href: ROUTE_LINKS.links,
		description: "Ссылки, важнейшее в интернете"
	},
	{
		name: "Избранный ютуб",
		href: ROUTE_LINKS.youtube,
		description: "Избранные ссылки"
	},
	{
		name: 'Демагог',
		href: ROUTE_LINKS.demagog,
		description: 'Справочник по демагогическим приёмам'
	},
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
	{
		name: "☝ Логизмы",
		href: ROUTE_LINKS.logism,
		description: "Цитаты друзей, знаменитостей, чтобы помнить и направлять себя"
	},
	{
		name: "Обучение",
		description: "В 2017 году, я написал курс переподготовки по программированию и рассказал его в ННГУ.",
		href: ROUTE_LINKS.learningIndex,
	},
	{
		name: '🖼 Фотографии во ВКонтакте',
		href: ROUTE_LINKS.toolVkIndex,
		description: 'Для удобной подписи и сортировки фотографий, используя всё пространство монитора, вместо узкой колонки оригинала'
	},
	{
		name: 'Список списков',
		href: ROUTE_LINKS.listListIndex,
		description: 'Когда мания каталогизации становится слишком сильной, можно составлять списки из всего, что попадётся под руку'
	},
	{
		name: "Аккорды",
		href: ROUTE_LINKS.accordIndex,
		description: "Песни, которые я играю на гитарниках, чтобы было понятно чему можно подпеть или какой будет репертуар с моей стороны"
	},
	{
		name: '🕑 Калькулятор времени',
		href: EXTERNAL_LINKS.serviceTimer,
		description: 'Когда нужно подсчитать сколько времени ушло в дне'
	},
	{
		name: 'Комоджи (⌐■_■)',
		href: ROUTE_LINKS.toolComoji,
		description: 'Смайлики на случай важных переговоров'
	},
	{
		name: 'Волшебный шар',
		href: ROUTE_LINKS.toolMagic,
		description: 'Когда особенно хочется погадать'
	},
	{
		name: "Настольные игры",
		href: ROUTE_LINKS.gameIndex,
		description: "Настолки, которые есть внутри моей компании, когда хочется поиграть, чтоб не спрашивать что ещё есть."
	},
] as const
