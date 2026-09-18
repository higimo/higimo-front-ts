import { FunctionComponent } from 'preact'
import { PortfolioProjectFullType } from 'api-types/portfolio.types'

import { useEmptyDataState } from 'hook/fetch/use-empty-data-state'
import { useLoadingState } from 'hook/fetch/use-loading-state'
import useApi from 'hook/fetch/use-api'

import { IntroHeader } from 'components/intro/intro-header'
import { Loading } from 'components/ui/loading'
import { NotFoundData } from 'components/ui/not-found-data'
import { ProjectList } from 'components/project/project-list'
import { ProjectMore } from 'components/project/project-more'
import { ProjectTag } from 'components/project/project-tag'
import { TextContainer } from 'components/ui/text-container'

import { ANCHOR_LINKS } from 'dic/ANCHOR_LINKS'
import { API_ROUTE } from 'dic/API_ROUTE'
import { PROJECT_FILTER_DIC } from 'components/project/filter_dictionary'
import { PROJECT_SHORT_TAGS } from './PROJECT_SHORT_TAGS'

import './style.css'

type PortfolioMetaType = {
	totalCount: number
}

export const ProjectListShort: FunctionComponent = () => {
	// TODO: [DATA] исправить обложки и размеры, сейчас грандиозные бывают normal
	// TODO: [BACKEND] присылать определённое количество, чтобы дырка не появлялась
	const [ highlightProjects ] = useApi<PortfolioProjectFullType[], PortfolioMetaType>(API_ROUTE.projectProject, {
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
				<IntroHeader>Сделал</IntroHeader>
			</TextContainer>

			<TextContainer className="project-list__filter">
				{PROJECT_SHORT_TAGS.map(tagName => (
					<ProjectTag filterName={PROJECT_FILTER_DIC.FILTER_TAG}>{tagName}</ProjectTag>
				))}
			</TextContainer>

			<ProjectList projectsList={projectsList} />
			{!!highlightProjects.meta ? (
				<ProjectMore count={highlightProjects.meta.totalCount} />
			) : null}
		</div>
	)
}
