import { LinksType } from 'api-types/links.types'

import { useEmptyDataState } from 'hook/use-empty-data-state'
import { useLoadingState } from 'hook/use-loading-state'
import useApi from 'hook/use-api'

import { LinksElement } from 'components/info-service/links/links-element'
import { Loading } from 'components/ui/loading'
import { NotFoundData } from 'components/ui/not-found-data'
import { TextContainer } from 'components/ui/text-container'

import { API_ROUTE } from 'dic/api-route'

export const LinksList = () => {
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
		<TextContainer>
			<ul>
				{links.data.map(item => <LinksElement {...item} />)}
			</ul>
		</TextContainer>
	)
}
