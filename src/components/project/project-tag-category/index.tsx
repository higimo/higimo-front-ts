import { FunctionComponent } from 'preact'
import { PortfolioGroupedTagType } from 'api-types/portfolio.types'
import { TagName } from 'types'

import { ProjectTag } from 'components/project/project-tag'
import { TextContainer } from 'components/ui/text-container'

import { PROJECT_FILTER_DIC } from 'dic/project/PROJECT_FILTER_DIC'

import '../project-click-tag-category/style.css'

type ProjectTagCategoryPropsType = {
	groupedTags: PortfolioGroupedTagType[] | null
	isSelected: (tagName: TagName) => boolean
	toggleTag: (tagName: TagName) => () => void
}

// TODO: [HARD] почти то же, что ProjectClickTagCategory
export const ProjectTagCategory: FunctionComponent<ProjectTagCategoryPropsType> = ({
	groupedTags,
	isSelected,
	toggleTag,
}) => groupedTags && (
	<TextContainer className="project-tag">
		{groupedTags.map(({ group, tags }) => (
			<div className="project-tag__category-group">
				<div className="project-tag__list">
					<div className="project-tag__category-name">{group.title}</div>
					{tags.map(tag => (
						<ProjectTag
							filterName={PROJECT_FILTER_DIC.FILTER_TAG}
							// isLink={false}
							isSelected={isSelected(tag.title)}
							toggleTag={toggleTag(tag.title)}
						>
							{tag.title}
						</ProjectTag>
					))}
				</div>
			</div>
		))}
	</TextContainer>
)
