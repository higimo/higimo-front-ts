import { TextContainer } from "components/ui/text-container"
import { FunctionComponent } from "preact"
import { PortfolioTag } from "types"
import { ProjectTag } from "../project-tag"
import { filterType } from "../project-tag-group-gallery/filter-type"

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
				<ProjectTag filterName={filterType.FILTER_TAG}>
					{tag.title}
				</ProjectTag>
			))}
		</TextContainer>
	)
}
