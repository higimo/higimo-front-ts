import { FunctionComponent } from 'preact';
import { PortfolioCreditsType } from 'types';

import { PortfolioWorker } from 'components/project/portfolio-worker';

type PortfolioCreditsGalleryPropsType = {
	credits: PortfolioCreditsType[];
};
export const PortfolioCreditsGallery: FunctionComponent<PortfolioCreditsGalleryPropsType> = ({ credits }) => {
	if (!credits.length) {
		return null;
	}

	return (
		<div className="project-viewer__credits">
			{credits.map(author => (
				<PortfolioWorker author={author} />
			))}
		</div>
	);
};
