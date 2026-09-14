import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'
import { ToolDataType } from 'utils.type'

// TODO: вынести в src/data и объединить с другими
export const TOOL_LINKS: ToolDataType[] = [
	// {
	// 	name: '✉ Эмайлер',
	// 	href: ROUTE_LINKS.toolEmailer,
	// 	description: 'Пошлёт на почту страницу интернета, чтобы прочитать в статью в удобном месте, даже без интернета',
	// },
	// {
	// 	name: 'RSS-читалка на почту',
	// 	href: NULL,
	// 	description: 'Подписываешься здесь — получаешь на почту',
	// },
	{
		name: 'Комоджики',
		href: ROUTE_LINKS.toolComoji,
		description: 'Смайлики на случай важных переговоров',
	},
	{
		name: 'Волшебный шар',
		href: ROUTE_LINKS.toolMagic,
		description: 'fewfew',
	},
	{
		name: 'Пет-проекты',
		href: ROUTE_LINKS.petProject,
		description: 'fewfew',
	},
	{
		name: 'Библиотека',
		href: ROUTE_LINKS.libraryIndex,
		description: 'fewfew',
		// href: ROUTE_LINKS.youtube,
		// href: ROUTE_LINKS.links,
		// href: ROUTE_LINKS.faqIndex,
		// href: ROUTE_LINKS.demagog,
		// href: ROUTE_LINKS.logism,
		// href: ROUTE_LINKS.learningIndex,
		// href: ROUTE_LINKS.gameIndex,
		// href: ROUTE_LINKS.thingsIndex,
		// href: ROUTE_LINKS.cinemaIndex,
		// href: ROUTE_LINKS.toolMagic,
		// href: ROUTE_LINKS.toolComoji,
		// href: ROUTE_LINKS.petProject,
		// href: ROUTE_LINKS.toolVkIndex,
		// href: ROUTE_LINKS.listListIndex,
		// href: ROUTE_LINKS.accordIndex,
		// href: NOKIA,
	},
] as const
