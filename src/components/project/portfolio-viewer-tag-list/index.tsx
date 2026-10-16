import { FunctionComponent } from 'preact'
import { PortfolioTag } from 'api-types/portfolio.types'

import { TextContainer } from 'components/ui/text-container'
import { ProjectTag } from 'components/project/project-tag'
import { PROJECT_FILTER } from 'dic/project/PROJECT_FILTER'

type PortfolioViewerTagListPropsType = {
	tags: PortfolioTag[],
}

export const PortfolioViewerTagList: FunctionComponent<PortfolioViewerTagListPropsType> = ({ tags }) => {
	if (!Array.isArray(tags) || !tags.length) {
		return null
	}

	return (
		<TextContainer className="project-viewer__tags">
			{tags.map(tag => (
				<ProjectTag key={tag.id} filterName={PROJECT_FILTER.FILTER_TAG}>
					{tag.title}
				</ProjectTag>
			))}
		</TextContainer>
	)
}
