import { FunctionComponent } from 'preact'

import { usePageTitle } from 'hook/browser/use-page-title'

import { ListListForm } from 'components/list/list-list-form'

export const ListListFormPage: FunctionComponent = () => {
	usePageTitle('Список списков')

	return (
		<div className="list-list">
			<ListListForm />
		</div>
	)
}
