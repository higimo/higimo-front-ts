import { FunctionComponent } from 'preact'

import { usePageTitle } from 'hook/use-page-title'

import { TextContainer } from 'components/ui/text-container'
import { LinksList } from 'components/info-service/links/links-list'
import { LinksType } from 'api-types/links.types'
import { Loading } from 'components/ui/loading'
import { NotFoundData } from 'components/ui/not-found-data'
import { API_ROUTE } from 'dic/API_ROUTE'
import useApi from 'hook/use-api'
import { useEmptyDataState } from 'hook/use-empty-data-state'
import { useLoadingState } from 'hook/use-loading-state'

export const LinksPage: FunctionComponent = () => {
	usePageTitle('Избранные ссылки')

	const [ links ] = useApi<LinksType[]>(API_ROUTE.link)
	const isLoading = useLoadingState([links.status])
	const isListEmpty = useEmptyDataState(links.data)

	if (isLoading) {
		return <Loading />
	}

	if (isListEmpty) {
		return <NotFoundData />
	}

	return (
		<div className="links-page">
			<TextContainer>
				<h2>Избранные ссылки</h2>
				<p>
					Собираю ссылки, которые впечатлили меня. Хочу чтобы про них знало побольше людей.
				</p>
			</TextContainer>
			<LinksList links={links.data} />
		</div>
	)
}
