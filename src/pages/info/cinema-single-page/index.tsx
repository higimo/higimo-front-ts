import { FunctionComponent } from 'preact'

import { CinemaScriptDetail } from '../../../components/data/cinema/cinema-script-detail'

export const CinemaSinglePage: FunctionComponent = () => {
	document.title = 'Кино'

	return (
		<div className="cinema-page">
			<CinemaScriptDetail />
		</div>
	)
}
