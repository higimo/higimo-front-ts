import { FunctionComponent } from 'preact'
import { PortfolioTag } from 'api-types/portfolio.types'

import { TextContainer } from 'components/ui/text-container'
import { ProjectTag } from 'components/project/project-tag'
import { PROJECT_FILTER_DIC } from 'components/project/project-tag-category/types'

type PortfolioCreditsGalleryProps = {
	tags: PortfolioTag[],
}

export const PortfolioViewerTags: FunctionComponent<PortfolioCreditsGalleryProps> = ({ tags }) => {
	if (!Array.isArray(tags) || !tags.length) {
		return null
	}

	return (
		<TextContainer className="project-viewer__tags">
			{tags.map(tag => (
				<ProjectTag filterName={PROJECT_FILTER_DIC.FILTER_TAG}>
					{tag.title}
				</ProjectTag>
			))}
		</TextContainer>
	)
}
