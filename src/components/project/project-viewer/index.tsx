import { FunctionComponent } from 'preact'
import { PortfolioProjectDetailType } from 'api-types/portfolio.types'

import { OnlyAdmin } from 'components/util/only-admin'
import { PortfolioCreditsGallery } from 'components/project/portfolio-credits-gallery'
import { PortfolioTagsGallery } from 'components/project/portfolio-tags-gallery'
import { TextContainer } from 'components/ui/text-container'
import { WorkerInput } from 'components/form/project/worker-input'

import { getHumanDate } from 'components/project/utils/getHumanDate'
import { getProjectText } from 'components/project/utils/getProjectText'

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
		{/* TODO: [MEDIUM] TAGS применить мапинг категоризации тегов */}
		{/* TODO: [HARD] Сделать интерфейс фигули, которая прописывает теги */}
		<PortfolioTagsGallery tags={project.tags || []} />
	</div>
)
