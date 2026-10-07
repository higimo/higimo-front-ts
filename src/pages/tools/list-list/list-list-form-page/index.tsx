import { FunctionComponent } from 'preact'

import { useApi } from 'hook/fetch/use-api'
import { useRoute } from 'preact-iso'

import { EmptyData } from 'components/ui/empty-data'
import { Layout } from 'components/ui/layout/Layout'
import { LoadSuspense } from 'components/ui/load-suspense'
import { NestedListForm } from 'components/list/nested-list-form'
import { NestedListItemFullType } from 'api-types/listlist.types'
import { TextContainer } from 'components/ui/text-container/TextContainer'

import { API_ROUTE } from 'dic/API_ROUTE'
import { DEFAULT_ID } from 'config/DEFAULT-ID'
import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'

export const ListListFormPage: FunctionComponent = () => {
	const { params: { idcode = DEFAULT_ID } } = useRoute()

	const [ nestedListItem ] = useApi<NestedListItemFullType[]>(API_ROUTE.listerItemSingle({ id: idcode }))

	// TODO: [BACKEND] пока что присылает по умолчанию главную — это надо исправить на пустоту
	const values = (
		idcode === DEFAULT_ID && nestedListItem.data
		? nestedListItem.data[0] ?? null
		: null
	)

	return (
		<Layout title="Список списков" className="list-list">
			<LoadSuspense data={nestedListItem}>
				<EmptyData data={nestedListItem}>
					<TextContainer>
						{!!values?.parent ? (
							<a href={ROUTE_LINKS.listListDetail({ idcode: values?.parent?.id })}>
								{values?.parent.title}
							</a>
						) : (
							<a href={ROUTE_LINKS.listListMain}>
								В начало
							</a>
						)}
					</TextContainer>

					<NestedListForm
						key={values?.id ?? DEFAULT_ID}
						initialData={values}
					/>
				</EmptyData>
			</LoadSuspense>
		</Layout>
	)
}
