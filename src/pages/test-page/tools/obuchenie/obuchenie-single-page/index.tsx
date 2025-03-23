import { FunctionComponent } from 'preact'

import { ObuchenieSingle } from '../../../../../components/obuchenie/obuchenie-single'

export const ObuchenieSinglePage: FunctionComponent = () => {
	document.title = 'Обучение'

	return (
		<div className="obuchenie-page">
			<ObuchenieSingle />
		</div>
	)
}
