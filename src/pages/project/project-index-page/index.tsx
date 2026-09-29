import { FunctionComponent } from 'preact'
import { PortfolioGroupedTagType, PortfolioProjectFullType } from 'api-types/portfolio.types'

import { useApi } from 'hook/fetch/use-api'
import { useRoute } from 'preact-iso'

import { EmptyData } from 'components/ui/empty-data'
import { Layout } from 'components/ui/layout/Layout'
import { LoadSuspense } from 'components/ui/load-suspense'
import { ProjectClickTagCategory } from 'components/project/project-click-tag-category'
import { ProjectList } from 'components/project/project-list'
import { TextContainer } from 'components/ui/text-container'

import { API_ROUTE } from 'dic/API_ROUTE'
import { PROJECT_FILTER_DIC } from 'dic/project/PROJECT_FILTER_DIC'

// TODO: [FEATURE] Прикольно, наверно, будет отбивать ещё года релизов. А, может, и архивность проектов.
// TODO: [FEATURE] Жаль, что есть огромный долг по публикациям. К примеру, даже эти обновления я пишу в ТГ, а не на сайте.
// TODO: [FEATURE] показать график когда публиковался на горизонтальном таймлайне, просто названиями
export const ProjectIndexPage: FunctionComponent = () => {
	const { query } = useRoute()

	const [ projectList ] = useApi<PortfolioProjectFullType[]>(API_ROUTE.projectProject)
	const [ tagList ] = useApi<PortfolioGroupedTagType[]>(API_ROUTE.projectGroupedTags)

	let filterProjectList = projectList.data
	if (query[PROJECT_FILTER_DIC.FILTER_TAG] && projectList.status === 'LOADED') {
		filterProjectList = projectList.data.filter(projectItem => {
			return projectItem.tags.some(tag => tag.title === query[PROJECT_FILTER_DIC.FILTER_TAG])
		})
	}

	return (
		<Layout title="Сделал" className="project-index-page">
			<TextContainer>
				<h1>Сделал</h1>
			</TextContainer>

			<LoadSuspense data={tagList}>
				<EmptyData data={tagList}>
					<ProjectClickTagCategory groupedTags={tagList.data} />
				</EmptyData>
			</LoadSuspense>

			<LoadSuspense data={projectList}>
				<EmptyData data={projectList}>
						<ProjectList projectsList={filterProjectList} />
				</EmptyData>
			</LoadSuspense>
		</Layout>
	)
}
