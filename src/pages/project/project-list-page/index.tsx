import { FunctionComponent } from 'preact'
import { PortfolioGroupedTagType, PortfolioProjectFullType } from 'api-types/portfolio.types'

import { useApi } from 'hook/fetch/use-api'
import { useRoute } from 'preact-iso'

import { EmptyData } from 'components/ui/empty-data'
import { Layout } from 'components/ui/layout/Layout'
import { LoadSuspense } from 'components/ui/load-suspense'
import { ProjectTagList } from 'components/project/project-tag-list'
import { ProjectList } from 'components/project/project-list'
import { TextContainer } from 'components/ui/text-container'

import { API_ROUTE } from 'dic/route/API_ROUTE'
import { PROJECT_FILTER } from 'dic/project/PROJECT_FILTER'

// TODO: [FEATURE_PORTFOLIO] Прикольно, наверно, будет отбивать ещё года релизов.
// А, может, и архивность (музей) проектов.
// TODO: [FEATURE_PORTFOLIO] Жаль, что есть огромный долг по публикациям.
// К примеру, даже эти обновления я пишу в ТГ, а не на сайте.
// TODO: [FEATURE_PORTFOLIO] показать график когда публиковался на горизонтальном
// таймлайне, просто названиями
export const ProjectListPage: FunctionComponent = () => {
	const { query } = useRoute()

	const [ projectList ] = useApi<PortfolioProjectFullType[]>(API_ROUTE.projectProject)
	const [ groupedTagList ] = useApi<PortfolioGroupedTagType[]>(API_ROUTE.projectGroupedTags)

	let filterProjectList = projectList.data
	if (query[PROJECT_FILTER.FILTER_TAG] && projectList.status === 'LOADED' && projectList.data) {
		filterProjectList = projectList.data.filter(projectItem => {
			return projectItem.tags.some(tag => tag.title === query[PROJECT_FILTER.FILTER_TAG])
		})
	}

	return (
		<Layout title="Сделал" className="project-index-page">
			<TextContainer>
				<h1>Сделал</h1>
			</TextContainer>

			<LoadSuspense data={groupedTagList}>
				<EmptyData data={groupedTagList}>
					<ProjectTagList
						variant="link"
						groupedTags={groupedTagList.data ?? []}
					/>
				</EmptyData>
			</LoadSuspense>

			<LoadSuspense data={projectList}>
				<EmptyData data={projectList}>
					<ProjectList
						projectsList={filterProjectList ?? []}
					/>
				</EmptyData>
			</LoadSuspense>
		</Layout>
	)
}
