import { TextContainer } from "components/ui/text-container"
import { FunctionComponent } from "preact"
import { PortfolioTag } from "types"
import { ProjectTag } from "../project-tag"
import { PROJECT_FILTER_DIC } from "../project-tag-category/dic"

type PortfolioCreditsGalleryProps = {
	tags: PortfolioTag[],
}

export const PortfolioTagsGallery: FunctionComponent<PortfolioCreditsGalleryProps> = ({ tags }) => {
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
