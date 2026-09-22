import { FunctionComponent } from 'preact'

import { useApi } from 'hook/fetch/use-api'
import { usePageTitle } from 'hook/browser/use-page-title'
import { useRoute } from 'preact-iso'

import { Loading } from 'components/ui/loading/Loading'
import { NestedListForm } from 'components/list/nested-list-form'
import { NestedListItemFullType } from 'api-types/listlist.types'

import { API_ROUTE } from 'dic/API_ROUTE'
import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'
import { TextContainer } from 'components/ui/text-container/TextContainer'

export const ListListFormPage: FunctionComponent = () => {
	usePageTitle('Список списков')

	const { params: { idcode = '' } } = useRoute()
	const [ data ] = useApi<NestedListItemFullType[]>(API_ROUTE.listerItemSingle({ id: idcode }))

	if (data.status === 'LOADING') {
		return <Loading />
	}

	// TODO: [BACKEND] пока что присылает по умолчанию главную — это надо исправить на пустоту
	const values = !!idcode.length ? data.data[0] : undefined

	return (
		<div className="list-list">
			<TextContainer>
				{!!values?.parent ? (
					<a href={ROUTE_LINKS.listListDetail({ idcode: values?.parent?.id.toString() })}>
						{values?.parent.title}
					</a>
				) : (
					<a href={ROUTE_LINKS.listListMain}>
						В начало
					</a>
				)}
			</TextContainer>

			<NestedListForm values={values} />
		</div>
	)
}
