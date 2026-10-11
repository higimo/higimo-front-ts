import { FunctionComponent } from 'preact'
import { PortfolioCreditsType } from 'api-types/portfolio.types'

import { PortfolioWorker } from 'components/project/portfolio-worker'

import './style.css'

// TODO: [ONE_CLASS_COMPONENT] прям отдельный компонент нужен? Мб, сделать общий с className

type PortfolioCreditListPropsType = {
	credits: PortfolioCreditsType[]
}

export const PortfolioCreditList: FunctionComponent<PortfolioCreditListPropsType> = ({ credits }) => {
	if (!credits.length) {
		return null
	}

	return (
		<div className="project-viewer__credits">
			{credits.map(author => (
				<PortfolioWorker author={author} />
			))}
		</div>
	)
}
