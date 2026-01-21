import { FunctionComponent } from 'preact'

import { usePageTitle } from 'hook/use-page-title'

import { CinemaScriptDetail } from 'components/data/cinema/cinema-script-detail'

export const CinemaSinglePage: FunctionComponent = () => {
	usePageTitle('Кино')

	return (
		<div className="cinema-page">
			<CinemaScriptDetail />
		</div>
	)
}
