import { FunctionComponent } from 'preact'

import { usePageTitle } from 'hook/browser/use-page-title'

import { NestedListForm } from 'components/list/nested-list-form'

export const ListListFormPage: FunctionComponent = () => {
	usePageTitle('Список списков')

	return (
		<div className="list-list">
			<NestedListForm />
		</div>
	)
}
