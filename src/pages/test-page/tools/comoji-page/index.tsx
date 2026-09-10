import { ComojiType } from 'api-types/comoji.types'
import { FunctionComponent } from 'preact'

import { useEmptyDataState } from 'hook/fetch/use-empty-data-state'
import { useLoadingState } from 'hook/fetch/use-loading-state'
import { usePageTitle } from 'hook/browser/use-page-title'
import useApi from 'hook/fetch/use-api'

import { ComojiGalery } from 'components/tool/comoji-galery'
import { Loading } from 'components/ui/loading'
import { TextContainer } from 'components/ui/text-container'

import { NotFoundPage } from 'pages/not-found-page'

import { API_ROUTE } from 'dic/API_ROUTE'

export const ComojiPage: FunctionComponent = () => {
	usePageTitle('Комоджи смайлы')

	const [ comojiList ] = useApi<ComojiType[]>(API_ROUTE.comoji)
	const isLoading = useLoadingState([comojiList.status])
	const isListEmpty = useEmptyDataState(comojiList.data)

	if (isLoading) {
		return <Loading />
	}
	if (isListEmpty) {
		return <NotFoundPage />
	}

	return (
		<div className="tool-index-page">
			<TextContainer>
				<h1>Комоджи смайлы</h1>
				<p>
					Нажимаешь на смайл — копируется в буфер обмена
				</p>
			</TextContainer>
			<ComojiGalery comoji={comojiList.data} />
		</div>
	)
}
