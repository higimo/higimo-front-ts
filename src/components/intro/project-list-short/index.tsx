import { FunctionComponent } from 'preact'
import { PortfolioMetaType, PortfolioProjectFullType } from 'api-types/portfolio.types'

import { IntroHeader } from 'components/intro/intro-header'
import { ProjectList } from 'components/project/project-list'
import { ProjectMore } from 'components/project/project-more'
import { ProjectTag } from 'components/project/project-tag'
import { TextContainer } from 'components/ui/text-container'

import { ANCHOR_LINKS } from 'dic/ANCHOR_LINKS'
import { PROJECT_FILTER_DIC } from 'dic/project/PROJECT_FILTER_DIC'
import { PROJECT_SHORT_TAGS } from 'dic/project/PROJECT_SHORT_TAGS'

import './style.css'

type ProjectListShortPropsType = {
	projects: PortfolioProjectFullType[]
	meta?: PortfolioMetaType
}

export const ProjectListShort: FunctionComponent<ProjectListShortPropsType> = ({
	projects,
	meta,
}) => (
	<div className="project-list project-list--short" id={ANCHOR_LINKS.done}>
		<TextContainer>
			<IntroHeader>Сделал</IntroHeader>
		</TextContainer>

		<TextContainer className="project-list__filter">
			{PROJECT_SHORT_TAGS.map(tagName => (
				<ProjectTag filterName={PROJECT_FILTER_DIC.FILTER_TAG}>{tagName}</ProjectTag>
			))}
		</TextContainer>

		<ProjectList projectsList={projects} />
		{!!meta ? (
			<ProjectMore count={meta.totalCount} />
		) : null}
	</div>
)
