import { FunctionComponent } from 'preact'

import { usePageTitle } from 'hook/use-page-title'

import { TextContainer } from 'components/ui/text-container'
import { ProjectTypographicTest } from '../project-typographic-test'

import { getHumanDate } from 'components/project/utils/getHumanDate'

import '../project-viewer/style.css'
import { PortfolioCreditsGallery } from '../portfolio-credits-gallery'
import { PortfolioTagsGallery } from '../portfolio-tags-gallery'
import { PortfolioCreditsType, PortfolioTag } from 'api-types/portfolio.types'





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
		id: 1, full_name: i.name, company: '', image: null, login: 'login', role: 'few', link: '/',
	},
}))

const tags: PortfolioTag[] = [
	{ id: 1, title: 'ALS', },
	{ id: 1, title: 'Студия', },
	{ id: 1, title: 'большой', },
	{ id: 1, title: 'нормальный', },
	{ id: 1, title: 'сильный', },
	{ id: 1, title: 'продакт', },
	{ id: 1, title: 'аналитик', },
	{ id: 1, title: 'разработчик', },
	{ id: 1, title: 'грандиозный', },
	{ id: 1, title: 'бекенд', },
	{ id: 1, title: 'продукты', },
	{ id: 1, title: 'Битрикс', },
	{ id: 1, title: 'длинный тег в несколько слов', },
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
