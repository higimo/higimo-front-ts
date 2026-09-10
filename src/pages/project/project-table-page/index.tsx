import { FunctionComponent } from 'preact'

import { usePageTitle } from 'hook/browser/use-page-title'
import { useTableProject } from 'hook/data/use-table-project'

import { PortfolioProjectTable } from 'components/project/portfolio-project-table'
import { ProjectTagCategory } from 'components/project/project-tag-category'
import { Loading } from 'components/ui/loading'
import { TextContainer } from 'components/ui/text-container'

import { NotFoundPage } from 'pages/not-found-page'

// TODO: [USE_TAGS] useTags
// Мы потихоньку ведём классификационную работу над советами.
// Помимо формальных характеристик («диаграмма», «таблица», «сайт», «предмет»)
// советы помечаются идеями, которые в них излагаются. Таким образом, каждый совет
// получит ссылки на похожие на него советы.
export const ProjectTablePage: FunctionComponent = () => {
	const {
		isLoading,
		isEmpty,
		tableProjects,
		tagList,
		isSelected,
		toggleTag,
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

			<ProjectTagCategory
				groupedTags={tagList}
				isSelected={isSelected}
				toggleTag={toggleTag}
			/>

			<PortfolioProjectTable tableProjects={tableProjects} />
		</div>
	)
}

export default ProjectTablePage
