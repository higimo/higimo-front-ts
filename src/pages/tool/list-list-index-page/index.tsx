import { FunctionComponent } from 'preact'

import { usePageTitle } from 'hook/browser/use-page-title'

import { ListList } from 'components/list/list-list'

export const ListListIndexPage: FunctionComponent = () => {
	usePageTitle('Список списков')

	return (
		<div className="list-list">
			<ListList />
		</div>
	)
}
