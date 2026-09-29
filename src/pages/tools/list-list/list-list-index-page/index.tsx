import { FunctionComponent } from 'preact'
import { NestedListItemFullType } from 'api-types/listlist.types'

import { useRoute } from 'preact-iso'
import { useApi } from 'hook/fetch/use-api'

import { EmptyData } from 'components/ui/empty-data'
import { Layout } from 'components/ui/layout/Layout'
import { LoadSuspense } from 'components/ui/load-suspense'
import { NestedList } from 'components/list/nested-list'

import { API_ROUTE } from 'dic/API_ROUTE'

export const ListListIndexPage: FunctionComponent = () => {
	const { params: { idcode = '' } } = useRoute()

	const filter = (parseInt(idcode, 10) > 0
		? { id: idcode }
		: (idcode.length
			? { code: idcode }
			: {}
		)
	)

	const [ nestedListItems ] = useApi<NestedListItemFullType[]>(API_ROUTE.lister, {
		filter,
		withParent: 'true',
		withChild: 'true',
		withProps: 'true',
	})

	return (
		<Layout title="Список списков" className="list-list-identity-page">
			<LoadSuspense data={nestedListItems}>
				<EmptyData data={nestedListItems}>
					<NestedList
						nestedList={nestedListItems.data}
					/>
				</EmptyData>
			</LoadSuspense>
		</Layout>
	)
}
