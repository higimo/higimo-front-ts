import { FunctionComponent } from 'preact'
import { PortfolioGroupedTagType } from 'api-types/portfolio.types'

import { ProjectTag } from 'components/project/project-tag'
import { TextContainer } from 'components/ui/text-container'

import { PROJECT_FILTER } from 'dic/project/PROJECT_FILTER'
import { PROJECT_IGRORED_TAG_GROUP } from 'data/project-ignored-tag-group'

import './style.css'

type ProjectClickTagCategoryPropsType = {
	groupedTags: PortfolioGroupedTagType[]
}

export const ProjectClickTagCategory: FunctionComponent<ProjectClickTagCategoryPropsType> = ({
	groupedTags,
}) => (
	<TextContainer className="project-tag">
		{groupedTags.map(({ group, tags }) => {
			if (PROJECT_IGRORED_TAG_GROUP.includes(group.title)) {
				return null
			}

			return (
				<div className="project-tag__category-group">
					<div className="project-tag__list">
						<div className="project-tag__category-name">{group.title}</div>
						{tags.map(tag => (
							<ProjectTag key={tag.id} filterName={PROJECT_FILTER.FILTER_TAG}>
								{tag.title}
							</ProjectTag>
						))}
					</div>
				</div>
			)
		})}
	</TextContainer>
)
