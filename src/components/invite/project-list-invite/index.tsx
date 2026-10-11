import { FunctionComponent } from 'preact'
import { PortfolioMetaType, PortfolioProjectFullType } from 'api-types/portfolio.types'

import { IntroHeader } from 'components/ui/intro-header'
import { ProjectList } from 'components/project/project-list'
import { ProjectMore } from 'components/project/project-more'
import { ProjectTag } from 'components/project/project-tag'
import { TextContainer } from 'components/ui/text-container'

import { ANCHOR_LINK } from 'dic/route/ANCHOR_LINK'
import { PROJECT_FILTER } from 'dic/project/PROJECT_FILTER'
import { PROJECT_SHORT_TAG } from 'dic/project/PROJECT_SHORT_TAG'

import './style.css'

type ProjectListInvitePropsType = {
	highlightProjectList: PortfolioProjectFullType[] | null
	meta?: PortfolioMetaType
}

export const ProjectListInvite: FunctionComponent<ProjectListInvitePropsType> = ({
	highlightProjectList,
	meta,
}) => highlightProjectList && (
	<div className="project-list project-list--short" id={ANCHOR_LINK.done}>
		<TextContainer>
			<IntroHeader>Сделал</IntroHeader>
		</TextContainer>

		<TextContainer className="project-list__filter">
			{PROJECT_SHORT_TAG.map(tagName => (
				<ProjectTag filterName={PROJECT_FILTER.FILTER_TAG}>{tagName}</ProjectTag>
			))}
		</TextContainer>

		<ProjectList projectsList={highlightProjectList} />
		{!!meta ? (
			<ProjectMore count={meta.totalCount} />
		) : null}
	</div>
)
