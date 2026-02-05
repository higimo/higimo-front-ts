import { FunctionComponent } from 'preact'
import { PortfolioProjectType, PortfolioProjectIdsType } from 'types'

import { useEmptyDataState } from 'hook/use-empty-data-state'
import { useLoadingState } from 'hook/use-loading-state'
import useApi from 'hook/use-api'

import { Loading } from 'components/ui/loading'
import { NotFoundData } from 'components/ui/not-found-data'
import { ProjectList } from 'components/project/project-list'
import { ProjectMore } from 'components/project/project-more/ProjectMore'
import { ProjectTag } from 'components/project/project-tag'
import { TextContainer } from 'components/ui/text-container'

import { ANCHOR_LINKS } from 'dic/ANCHOR_LINKS'
import { API_ROUTE } from 'dic/api-route'
import { filterType } from 'components/project/project-tag-gallery/filter-type'

import './style.css'

export const ProjectListShort: FunctionComponent = () => {
	const [ projectIds ] = useApi<PortfolioProjectIdsType[]>(API_ROUTE.projectIds) // TODO: заменить на meta.count
	const [ highProjectList ] = useApi<PortfolioProjectType[]>(API_ROUTE.projectProject, {
		filter: { cover_size: 'high'},
		limit: 6
	})

	const isLoading = useLoadingState([highProjectList.status, projectIds.status])
	const isHighProjectListEmpty = useEmptyDataState(highProjectList.data)
	const isProjectIdsEmpty = useEmptyDataState(projectIds.data)

	if (isLoading) {
		return <Loading />
	}

	if (isHighProjectListEmpty || isProjectIdsEmpty) {
		return <NotFoundData />
	}

	const projectsList = highProjectList.data

	return (
		<div className="project-list project-list--short" id={ANCHOR_LINKS.done}>
			<TextContainer>
				<h2 className="project-list__header">Сделал</h2>
			</TextContainer>
			<TextContainer className="project-list__filter">
				<ProjectTag filterName={filterType.FILTER_TAG}>грандиозный</ProjectTag>
				<ProjectTag filterName={filterType.FILTER_TAG}>SuperJob</ProjectTag>
				<ProjectTag filterName={filterType.FILTER_TAG}>Рамблер</ProjectTag>
				<ProjectTag filterName={filterType.FILTER_TAG}>Студия Лебедева</ProjectTag>
				<ProjectTag filterName={filterType.FILTER_TAG}>Эртоп</ProjectTag>
				<ProjectTag filterName={filterType.FILTER_TAG}>Пересечения</ProjectTag>
				<ProjectTag filterName={filterType.FILTER_TAG}>хомяк</ProjectTag>
			</TextContainer>
			<ProjectList projectsList={projectsList} />
			<ProjectMore count={projectIds.data.length} />
		</div>
	)
}
