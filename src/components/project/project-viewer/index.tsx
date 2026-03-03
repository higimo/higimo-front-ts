import { FunctionComponent } from 'preact'

import { useRoute } from 'preact-iso'
import { useProjectViewer } from 'components/project/hooks/useProjectViewer'
import { usePageTitle } from 'hook/use-page-title'

import { Loading } from 'components/ui/loading'
import { OnlyAdmin } from 'components/util/only-admin'
import { PortfolioCreditsGallery } from 'components/project/portfolio-credits-gallery'
import { PortfolioTagsGallery } from 'components/project/portfolio-tags-gallery'
import { TextContainer } from 'components/ui/text-container'
import { WorkerInput } from 'components/form/project/worker-input'

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
				{getHumanDate(date)}
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
				<div>
					<WorkerInput projectId={curProject.id} />
				</div>
			</OnlyAdmin>
			<PortfolioCreditsGallery credits={curProject.credits} />
			{/* TODO TAGS применить мапинг категоризации тегов */}
			<PortfolioTagsGallery tags={curProject.tags || []} />
		</div>
	)
}
