import { FunctionComponent } from 'preact';
import { PortfolioCreditsType } from 'types';

import { MaybeLink } from 'components/ui/maybe-link/maybe-link';

type PortfolioWorkerPropsType = {
	author: PortfolioCreditsType;
};
export const PortfolioWorker: FunctionComponent<PortfolioWorkerPropsType> = ({ author }) => {
	return (
		<div className="project-viewer__person person">
			<div className="person__name">
				<MaybeLink isHref={!!author.worker.link?.length} href={author.worker.link}>
					{author.worker.full_name}
				</MaybeLink>
			</div>
			<div className="person__role">
				{author.role}
			</div>
		</div>
	);
};
