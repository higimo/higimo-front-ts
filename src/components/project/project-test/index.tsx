import { FunctionComponent } from 'preact'
import { PortfolioCreditsType, PortfolioTag, PortfolioWorkerId } from 'api-types/portfolio.types'

import { usePageTitle } from 'hook/use-page-title'

import { TextContainer } from 'components/ui/text-container'
import { ProjectTypographicTest } from '../project-typographic-test'

import { getHumanDate } from 'components/project/utils/getHumanDate'
import { PortfolioCreditsGallery } from 'components/project/portfolio-credits-gallery'
import { PortfolioTagsGallery } from 'components/project/portfolio-tags-gallery'

import '../project-viewer/style.css'

const portfolioWorkerId: PortfolioWorkerId = 1 as PortfolioWorkerId

// TODO: унести в фикстуры
const credits: PortfolioCreditsType[] = `\
	Артемий Лебедев      | худрук
	Павел Герасимчук     | арт-директор и дизайнер
	Эркен Кагаров        | тайный советник
	Светлана Ярошевич    | дизайнер
	Анна Савельева       | технический дизайнер
	Мария Павлова        | технический дизайнер
	Зоригто Сансараймаев | технический дизайнер
	Анастасия Шумакова   | менеджер
	Ангелина Загорская   | менеджер
	Егор Преженцев       | менеджер
	Татьяна Козлова      | переводчик
	Александр Носиков    | редактор
	Дмитрий Уткин        | бэкендер
	Олег Постоев         | фронтендер
	Дмитрий Муратов      | бета-тестер
	Станислав Щербаков   | фотограф
	Игорь Фаткин         | фотограф
`
	.split('\n')
	.map(line => {
		const [name, role] = line.split('|').map(item => item.replace(/\t/g, '').trim())
		return {
			role: role,
			worker: {
				id: portfolioWorkerId, full_name: name, company: '', image: null, login: 'login', role: 'few', link: '/',
			},
		}
	})

const portfolioTagId = 1 as PortfolioTag['id']

// TODO: унести в фикстуры
const tags: PortfolioTag[] =
	'ALS|Студия|большой|нормальный|сильный|продакт|аналитик|разработчик|грандиозный|бекенд|продукты|Битрикс|длинный тег в несколько слов'
	.split('|')
	.map(tagName => ({
		id: portfolioTagId, title: tagName
	}))

export const ProjectTypography: FunctionComponent = () => {
	usePageTitle('Тестовая страница')

	return (
		<div className="project-viewer">
			<TextContainer className="project-viewer__date">
				{getHumanDate('2026-02-13')}
			</TextContainer>
			<TextContainer>
				<h1>Тестовая страница</h1>
			</TextContainer>
			<div className="content">
				<ProjectTypographicTest />
			</div>

			<PortfolioCreditsGallery credits={credits} />

			<PortfolioTagsGallery tags={tags} />
		</div>
	)
}

export default ProjectTypography
