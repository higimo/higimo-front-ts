import { FunctionComponent } from 'preact'
import { PortfolioCreditsType } from 'api-types/portfolio.types'

import { PortfolioWorker } from 'components/project/portfolio-worker'

import './style.css'

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
				<PortfolioWorker
					key={`${author.worker}_${author.role}`}
					author={author}
				/>
			))}
		</div>
	)
}
