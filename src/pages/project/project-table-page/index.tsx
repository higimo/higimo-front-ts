import { FunctionComponent } from 'preact'

import { usePageTitle } from 'hook/use-page-title'
import { useTableProject } from 'hook/use-table-project'

import { Loading } from 'components/ui/loading'
import { PortfolioProjectTable } from 'components/project/portfolio-project-table'
// import { ProjectTagGroupGallery } from 'components/project/project-tag-group-gallery'
import { TextContainer } from 'components/ui/text-container'

import { NotFoundPage } from 'pages/not-found-page'

// TODO: Тегирование
// Мы потихоньку ведём классификационную работу над советами. Помимо формальных характеристик («диаграмма», «таблица», «сайт», «предмет») советы помечаются идеями, которые в них излагаются. Таким образом, каждый совет получит ссылки на похожие на него советы.
export const ProjectTablePage: FunctionComponent = () => {
	const {
		isLoading,
		isEmpty,
		tableProjects,
		tagList,
	} = useTableProject()

	usePageTitle('Сделал')

	if (isLoading) {
		return <Loading />
	}
	if (isEmpty) {
		return <NotFoundPage />
	}

	return (
		<div className="project-index-page">
			<TextContainer>
				<h1>Таблица сделанного</h1>
			</TextContainer>
			{/* TODO: галерея тегов пока не работает */}
			{/* <ProjectTagGroupGallery tags={tagList} /> */}
			<PortfolioProjectTable tableProjects={tableProjects} />
		</div>
	)
}

export default ProjectTablePage
