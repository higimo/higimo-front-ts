import { FunctionComponent } from 'preact'
import { PortfolioProjectFullType } from 'api-types/portfolio.types'

import { useEmptyDataState } from 'hook/use-empty-data-state'
import { useLoadingState } from 'hook/use-loading-state'
import useApi from 'hook/use-api'

import { Loading } from 'components/ui/loading'
import { NotFoundData } from 'components/ui/not-found-data'
import { ProjectList } from 'components/project/project-list'
import { ProjectMore } from 'components/project/project-more'
import { ProjectTag } from 'components/project/project-tag'
import { TextContainer } from 'components/ui/text-container'

import { ANCHOR_LINKS } from 'dic/ANCHOR_LINKS'
import { API_ROUTE } from 'dic/API_ROUTE'
import { PROJECT_FILTER_DIC } from 'components/project/filter_dictionary'

import './style.css'

export const ProjectListShort: FunctionComponent = () => {
	// TODO: надо как-то типизировать meta
	// TODO: исправить обложки и размеры, сейчас грандиозные бывают normal
	// TODO: присылать определённое количество, чтобы дырка не появлялась
	const [ highlightProjects ] = useApi<PortfolioProjectFullType[]>(API_ROUTE.projectProject, {
		// filter: { cover_size: 'high'},
		limit: 6
	})

	const isLoading = useLoadingState([highlightProjects.status])
	const isEmpty = useEmptyDataState(highlightProjects.data)

	if (isLoading) {
		return <Loading />
	}
	if (isEmpty) {
		return <NotFoundData />
	}

	const projectsList = highlightProjects.data

	return (
		<div className="project-list project-list--short" id={ANCHOR_LINKS.done}>
			<TextContainer>
				<h2 className="project-list__header">Сделал</h2>
			</TextContainer>
			<TextContainer className="project-list__filter">
				<ProjectTag filterName={PROJECT_FILTER_DIC.FILTER_TAG}>грандиозный</ProjectTag>
				<ProjectTag filterName={PROJECT_FILTER_DIC.FILTER_TAG}>SuperJob</ProjectTag>
				<ProjectTag filterName={PROJECT_FILTER_DIC.FILTER_TAG}>Рамблер</ProjectTag>
				<ProjectTag filterName={PROJECT_FILTER_DIC.FILTER_TAG}>Студия Лебедева</ProjectTag>
				<ProjectTag filterName={PROJECT_FILTER_DIC.FILTER_TAG}>Эртоп</ProjectTag>
				<ProjectTag filterName={PROJECT_FILTER_DIC.FILTER_TAG}>Пересечения</ProjectTag>
				<ProjectTag filterName={PROJECT_FILTER_DIC.FILTER_TAG}>хомяк</ProjectTag>
			</TextContainer>
			<ProjectList projectsList={projectsList} />
			{'meta' in highlightProjects && 'totalCount' in highlightProjects?.meta ? (
				<ProjectMore count={highlightProjects.meta.totalCount as number} />
			) : null}
		</div>
	)
}
