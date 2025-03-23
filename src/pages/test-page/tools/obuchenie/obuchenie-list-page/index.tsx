import { FunctionComponent } from 'preact'

import { ObuchenieList } from '../../../../../components/obuchenie/obuchenie-list'

export const ObuchenieListPage: FunctionComponent = () => {
	document.title = 'Обучение'

	return (
		<div className="obuchenie-page">
			<ObuchenieList />
		</div>
	)
}
