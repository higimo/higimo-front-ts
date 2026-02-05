import { FunctionComponent } from 'preact'
import { filterType } from 'components/project/project-tag-gallery/filter-type'

import { useRoute } from 'preact-iso'
import { useProjectViewer } from 'components/project/hooks/useProjectViewer'
import { usePageTitle } from 'hook/use-page-title'

import { Loading } from 'components/ui/loading'
import { TextContainer } from 'components/ui/text-container'
import { OnlyAdmin } from 'components/util/only-admin'
import { WorkerInput } from 'components/form/project/worker-input'
import { ProjectTag } from 'components/project/project-tag'
import { MaybeLink } from 'components/ui/maybe-link/maybe-link'

import { getHumanDate } from 'components/project/utils/getHumanDate'
import { getProjectText } from 'components/project/utils/getProjectText'

import { NotFoundPage } from 'pages/not-found-page'

import './style.css'

export const ProjectViewer: FunctionComponent = () => {
	const { params: { vendor, project } } = useRoute()

	const [curProject, isLoading, isEmpty] = useProjectViewer(vendor, project)

	usePageTitle(curProject.name ? `${curProject.name} | Проект Хигимо` : 'Проект Хигимо')

	if (isLoading) {
		return <Loading />
	}
	if (isEmpty) {
		return <NotFoundPage />
	}

	const { date, name, text = '' } = curProject

	return (
		<div className="project-viewer">
			<TextContainer className="project-viewer__date">
				<div className="date">
					{getHumanDate(date)}
				</div>
			</TextContainer>
			<TextContainer>
				<h1>{name}</h1>
			</TextContainer>
			<div
				className="content"
				dangerouslySetInnerHTML={{
					__html: getProjectText(text)
				}}
			/>
			<OnlyAdmin>
				<div className="project-viewer__credits">
					<WorkerInput projectId={curProject.id} />
				</div>
			</OnlyAdmin>
			{!!curProject.credits.length && (
				<div className="project-viewer__credits">
					{(curProject.credits || []).map(author => (
						<div className="project-viewer__person person">
							<div className="person__name">
								<MaybeLink isHref={!!author.worker.link?.length} href={author.worker.link}>
									{author.worker.full_name}
								</MaybeLink>
							</div>
							<div className="person__role">
								{author.role}
							</div>
						</div>
					))}
				</div>
			)}
			{/* TODO TAGS применить мапинг категоризации тегов */}
			{!!(curProject.tags || []).length && (
				<TextContainer className="project-viewer__tags">
					{(curProject.tags || []).map(tag => (
						<ProjectTag filterName={filterType.FILTER_TAG}>
							{tag.title}
						</ProjectTag>
					))}
				</TextContainer>
			)}
		</div>
	)
}
