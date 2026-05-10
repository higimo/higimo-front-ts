import { FunctionComponent } from 'preact'
import { PortfolioGroupedTagType } from 'api-types/portfolio.types'

import { ProjectTag } from 'components/project/project-tag'
import { TextContainer } from 'components/ui/text-container'

import { PROJECT_FILTER_DIC } from 'components/project/project-tag-category/types'

import './style.css'

const IGRORED_TAG_GROUPS = ['other', 'Локация', 'Продукт', 'Технология']

export const ProjectTagCategory: FunctionComponent<{ groupedTags: PortfolioGroupedTagType[]; }> = ({ groupedTags }) => {
	return (
		<TextContainer className="project-tag">
			{groupedTags.map(({ group, tags }) => {
				if (IGRORED_TAG_GROUPS.includes(group.title)) {
					return null
				}

				return (
					<div className="project-tag__category-group">
						<div className="project-tag__list">
							<div className="project-tag__category-name">{group.title}</div>
							{tags.map(tag => (
								<ProjectTag filterName={PROJECT_FILTER_DIC.FILTER_TAG}>{tag.title}</ProjectTag>
							))}
						</div>
					</div>
				)
			})}
		</TextContainer>
	)
};
