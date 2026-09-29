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
import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'

export const ListListFormPage: FunctionComponent = () => {
	const { params: { idcode = '' } } = useRoute()

	const [ data ] = useApi<NestedListItemFullType[]>(API_ROUTE.listerItemSingle({ id: idcode }))

	// TODO: [BACKEND] пока что присылает по умолчанию главную — это надо исправить на пустоту
	const values = !!idcode.length ? data.data[0] : undefined

	return (
		<Layout title="Список списков" className="list-list">
			<LoadSuspense data={data}>
				<EmptyData data={data}>
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

					<NestedListForm values={values} />
				</EmptyData>
			</LoadSuspense>
		</Layout>
	)
}
