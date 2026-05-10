import { PortfolioTag } from 'api-types/portfolio.types'

const portfolioTagId = 1 as PortfolioTag['id']

export const tags: PortfolioTag[] = 'ALS|Студия|большой|нормальный|сильный|продакт|аналитик|разработчик|грандиозный|бекенд|продукты|Битрикс|длинный тег в несколько слов'
	.split('|')
	.map(tagName => ({
		id: portfolioTagId, title: tagName
	}));
