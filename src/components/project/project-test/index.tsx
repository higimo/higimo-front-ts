import { FunctionComponent } from 'preact'
import { PortfolioCreditsType, PortfolioTag, PortfolioTagId, PortfolioWorkerId } from 'api-types/portfolio.types'

import { usePageTitle } from 'hook/use-page-title'

import { TextContainer } from 'components/ui/text-container'
import { ProjectTypographicTest } from '../project-typographic-test'

import { getHumanDate } from 'components/project/utils/getHumanDate'
import { PortfolioCreditsGallery } from 'components/project/portfolio-credits-gallery'
import { PortfolioTagsGallery } from 'components/project/portfolio-tags-gallery'

import '../project-viewer/style.css'

const portfolioWorkerId: PortfolioWorkerId = 1 as PortfolioWorkerId

const credits: PortfolioCreditsType[] = [
	{ role: 'худрук',                  name: 'Артемий Лебедев', },
	{ role: 'арт-директор и дизайнер', name: 'Павел Герасимчук', },
	{ role: 'тайный советник',         name: 'Эркен Кагаров', },
	{ role: 'дизайнер',                name: 'Светлана Ярошевич', },
	{ role: 'технический дизайнер',    name: 'Анна Савельева', },
	{ role: 'технический дизайнер',    name: 'Мария Павлова', },
	{ role: 'технический дизайнер',    name: 'Зоригто Сансараймаев', },
	{ role: 'менеджер',                name: 'Анастасия Шумакова', },
	{ role: 'менеджер',                name: 'Ангелина Загорская', },
	{ role: 'менеджер',                name: 'Егор Преженцев', },
	{ role: 'переводчик',              name: 'Татьяна Козлова', },
	{ role: 'редактор',                name: 'Александр Носиков', },
	{ role: 'бэкендер',                name: 'Дмитрий Уткин', },
	{ role: 'фронтендер',              name: 'Олег Постоев', },
	{ role: 'бета-тестер',             name: 'Дмитрий Муратов', },
	{ role: 'фотограф',                name: 'Станислав Щербаков', },
	{ role: 'фотограф',                name: 'Игорь Фаткин', },
].map(i => ({
	role: i.role,
	worker: {
		id: portfolioWorkerId, full_name: i.name, company: '', image: null, login: 'login', role: 'few', link: '/',
	},
}))

const portfolioTagId: PortfolioTagId = 1 as PortfolioTagId

const tags: PortfolioTag[] = [
	{ id: portfolioTagId, title: 'ALS', },
	{ id: portfolioTagId, title: 'Студия', },
	{ id: portfolioTagId, title: 'большой', },
	{ id: portfolioTagId, title: 'нормальный', },
	{ id: portfolioTagId, title: 'сильный', },
	{ id: portfolioTagId, title: 'продакт', },
	{ id: portfolioTagId, title: 'аналитик', },
	{ id: portfolioTagId, title: 'разработчик', },
	{ id: portfolioTagId, title: 'грандиозный', },
	{ id: portfolioTagId, title: 'бекенд', },
	{ id: portfolioTagId, title: 'продукты', },
	{ id: portfolioTagId, title: 'Битрикс', },
	{ id: portfolioTagId, title: 'длинный тег в несколько слов', },
]

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
