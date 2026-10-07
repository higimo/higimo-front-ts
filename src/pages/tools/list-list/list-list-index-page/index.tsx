import { FunctionComponent } from 'preact'
import { NestedListItemFullType } from 'api-types/listlist.types'

import { useRoute } from 'preact-iso'
import { useApi } from 'hook/fetch/use-api'

import { EmptyData } from 'components/ui/empty-data'
import { Layout } from 'components/ui/layout/Layout'
import { LoadSuspense } from 'components/ui/load-suspense'
import { NestedList } from 'components/list/nested-list'

import { API_ROUTE } from 'dic/API_ROUTE'
import { DEFAULT_ID } from 'config/DEFAULT-ID'

export const ListListIndexPage: FunctionComponent = () => {
	const { params: { idcode = DEFAULT_ID } } = useRoute()

	const filter = (parseInt(idcode, 10) > 0
		? { id: idcode }
		: (idcode.length
			? { code: idcode }
			: {}
		)
	)

	const [ nestedListList ] = useApi<NestedListItemFullType[]>(API_ROUTE.lister, {
		// @ts-ignore
		filter,
		withParent: 'true',
		withChild: 'true',
		withProps: 'true',
	})

	return (
		<Layout title="Список списков" className="list-list-identity-page">
			<LoadSuspense data={nestedListList}>
				<EmptyData data={nestedListList}>
					<NestedList
						nestedList={nestedListList.data}
					/>
				</EmptyData>
			</LoadSuspense>
		</Layout>
	)
}
