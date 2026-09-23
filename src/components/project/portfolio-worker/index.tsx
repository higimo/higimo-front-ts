import { FunctionComponent } from 'preact'
import { PortfolioCreditsType } from 'api-types/portfolio.types'

import { MaybeLink } from 'components/ui/maybe-link'

type PortfolioWorkerPropsType = {
	author: PortfolioCreditsType
}

export const PortfolioWorker: FunctionComponent<PortfolioWorkerPropsType> = ({ author }) => {
	return (
		<div className="project-viewer__person portfolio-person">
			<div className="portfolio-person__name">
				<MaybeLink isHref={!!author.worker.link?.length} href={author.worker.link}>
					{author.worker.full_name}
				</MaybeLink>
			</div>
			<div className="portfolio-person__role">
				{author.role}
			</div>
		</div>
	)
}
