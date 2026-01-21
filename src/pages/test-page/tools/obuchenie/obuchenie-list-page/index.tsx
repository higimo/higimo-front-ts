import { FunctionComponent } from 'preact'

import { usePageTitle } from 'hook/use-page-title'

import { ObuchenieList } from 'components/obuchenie/obuchenie-list'

export const ObuchenieListPage: FunctionComponent = () => {
	usePageTitle('Обучение')

	return (
		<div className="obuchenie-page">
			<ObuchenieList />
		</div>
	)
}
