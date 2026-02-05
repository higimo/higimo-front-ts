import { FunctionComponent } from 'preact'
import { PortfolioTag } from 'types'

import { ProjectTagCategory } from 'components/project/project-tag-category'
import { TextContainer } from 'components/ui/text-container'

import './style.css'

type ProjectTagGalleryPropsType = {
	tags: PortfolioTag[],
}
export const ProjectTagGroupGallery: FunctionComponent<ProjectTagGalleryPropsType> = ({ tags }) => {
	return (
		<TextContainer className="project-tag">
			<ProjectTagCategory tags={tags} />
		</TextContainer>
	)
}

