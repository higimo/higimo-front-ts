import { FunctionComponent } from 'preact'
import { PortfolioGroupedTagType } from 'api-types/portfolio.types'
import { TagName } from 'types'

import { ProjectTag } from 'components/project/project-tag'
import { TextContainer } from 'components/ui/text-container'

import { PROJECT_FILTER } from 'dic/project/PROJECT_FILTER'
import { PROJECT_IGRORED_TAG_GROUP } from 'data/project-ignored-tag-group'

import './style.css'

type ProjectTagListPropsType =
	| {
		variant: 'link'
		groupedTags: PortfolioGroupedTagType[]
	}
	| {
		variant: 'select'
		groupedTags: PortfolioGroupedTagType[]
		isSelected: (tagName: TagName) => boolean
		toggleTag: (tagName: TagName) => () => void
	}

export const ProjectTagList: FunctionComponent<ProjectTagListPropsType> = (
	props
) => (
	<TextContainer className="project-tag">
		{props.groupedTags
			.filter(({ group }) => !PROJECT_IGRORED_TAG_GROUP.includes(group.title))
			.map(({ group, tags }) => (
				<div key={group.id} className="project-tag__category-group">
					<div className="project-tag__list">
						<div className="project-tag__category-name">
							{group.title}
						</div>
						{tags.map(tag => (
							<ProjectTag // Окей
								key={tag.id} // Окей
								filterName={PROJECT_FILTER.FILTER_TAG}
								isLink={props.variant === 'select' ? false : true}
								isSelected={props.variant === 'select' ? props.isSelected(tag.title) : undefined}
								toggleTag={props.variant === 'select' ? props.toggleTag(tag.title) : undefined}
							>
								{tag.title}
							</ProjectTag>
						))}
					</div>
				</div>
			)
		)}
	</TextContainer>
)
