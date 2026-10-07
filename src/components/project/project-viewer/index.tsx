import { FunctionComponent } from 'preact'
import { PortfolioProjectDetailType } from 'api-types/portfolio.types'

import { OnlyAdmin } from 'components/util/only-admin'
import { PortfolioCreditsGallery } from 'components/project/portfolio-credits-gallery'
import { PortfolioViewerTags } from 'components/project/portfolio-viewer-tags'
import { TextContainer } from 'components/ui/text-container'
import { WorkerInput } from 'components/form/project/worker-input'

import { getHumanDate } from 'utils/date/get-human-date'
import { getProjectText } from 'utils/project/get-project-text'

import './style.css'

type ProjectViewerPropsType = {
	projectItem: PortfolioProjectDetailType | null
}

export const ProjectViewer: FunctionComponent<ProjectViewerPropsType> = ({
	projectItem
}) => projectItem && (
	<div className="project-viewer">
		<TextContainer className="project-viewer__date">
			{getHumanDate(projectItem.date)}
		</TextContainer>
		<TextContainer>
			<h1>{projectItem.name}</h1>
		</TextContainer>
		<div
			className="content"
			dangerouslySetInnerHTML={{
				__html: getProjectText(projectItem.text)
			}}
		/>
		<OnlyAdmin>
			<div>
				<WorkerInput projectId={projectItem.id} />
			</div>
		</OnlyAdmin>
		<PortfolioCreditsGallery credits={projectItem.credits} />
		<PortfolioViewerTags tags={projectItem.tags || []} />
	</div>
)
