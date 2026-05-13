import { FunctionComponent } from 'preact'

import { usePageTitle } from 'hook/use-page-title'

import { TextContainer } from 'components/ui/text-container'
import { ProjectTypographicTest } from 'components/project/project-typographic-test'
import { PortfolioCreditsGallery } from 'components/project/portfolio-credits-gallery'
import { PortfolioViewerTags } from 'components/project/portfolio-viewer-tags'

import { getHumanDate } from 'components/project/utils/get-human-date'

import { credits } from 'fixtures/credits.fixtures'
import { tags } from 'fixtures/tags.fixtures'

import '../project-viewer/style.css'

export const ProjectTypography: FunctionComponent = () => {
	usePageTitle('Тестовая страница')

	return (
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

			<PortfolioCreditsGallery credits={credits} />
			<PortfolioCreditsGallery credits={credits.slice(0, 2)} />
			<PortfolioCreditsGallery credits={credits.slice(0, 1)} />

			<PortfolioViewerTags tags={tags} />
			<PortfolioViewerTags tags={tags.slice(-5)} />
		</div>
	)
}

export default ProjectTypography
