import { FunctionComponent } from 'preact'

import { usePageTitle } from 'hook/use-page-title'

import { ObuchenieSingle } from 'components/obuchenie/obuchenie-single'

export const ObuchenieSinglePage: FunctionComponent = () => {
	usePageTitle('Обучение')

	return (
		<div className="obuchenie-page">
			<ObuchenieSingle />
		</div>
	)
}
