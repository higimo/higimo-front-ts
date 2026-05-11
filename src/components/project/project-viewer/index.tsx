import { FunctionComponent } from 'preact'
import { PortfolioProjectDetailType } from 'api-types/portfolio.types'

import { OnlyAdmin } from 'components/util/only-admin'
import { PortfolioCreditsGallery } from 'components/project/portfolio-credits-gallery'
import { PortfolioViewerTags } from 'components/project/portfolio-viewer-tags'
import { TextContainer } from 'components/ui/text-container'
import { WorkerInput } from 'components/form/project/worker-input'

import { getHumanDate } from 'components/project/utils/get-human-date'
import { getProjectText } from 'components/project/utils/get-project-text'

import './style.css'

type ProjectViewerPropsType = {
	project: PortfolioProjectDetailType
}
export const ProjectViewer: FunctionComponent<ProjectViewerPropsType> = ({ project }) => (
	<div className="project-viewer">
		<TextContainer className="project-viewer__date">
			{getHumanDate(project.date)}
		</TextContainer>
		<TextContainer>
			<h1>{project.name}</h1>
		</TextContainer>
		<div
			className="content"
			dangerouslySetInnerHTML={{
				__html: getProjectText(project.text)
			}}
		/>
		<OnlyAdmin>
			<div>
				<WorkerInput projectId={project.id} />
			</div>
		</OnlyAdmin>
		<PortfolioCreditsGallery credits={project.credits} />
		<PortfolioViewerTags tags={project.tags || []} />
	</div>
)
