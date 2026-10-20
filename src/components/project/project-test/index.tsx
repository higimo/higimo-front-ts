import { FunctionComponent } from 'preact'

import { TextContainer } from 'components/ui/text-container'
import { ProjectTypographicTest } from 'components/project/project-typographic-test'
import { PortfolioCreditList } from 'components/project/portfolio-credit-list'
import { PortfolioViewerTagList } from 'components/project/portfolio-viewer-tag-list'

import { getHumanDate } from 'utils/date/get-human-date'

import { credits } from 'fixtures/credits.fixtures'
import { tags } from 'fixtures/tags.fixtures'

import '../project-detail/style.css'

export const ProjectTypography: FunctionComponent = () => (
	<div className="project-viewer">
		<TextContainer className="project-viewer__date">
			{getHumanDate('2026-02-13')}
		</TextContainer>
		<TextContainer>
			<h1>Тестовая страница</h1>
		</TextContainer>
		<div className="content">
			<ProjectTypographicTest />
		</div>

		<PortfolioCreditList credits={credits} />
		<PortfolioCreditList credits={credits.slice(0, 2)} />
		<PortfolioCreditList credits={credits.slice(0, 1)} />

		<PortfolioViewerTagList tags={tags} />
		<PortfolioViewerTagList tags={tags.slice(-5)} />
	</div>
)
