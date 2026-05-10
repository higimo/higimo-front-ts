import { FunctionComponent } from 'preact'
import { ComojiType } from 'api-types/comoji.types'

import { useEmptyDataState } from 'hook/use-empty-data-state'
import { useLoadingState } from 'hook/use-loading-state'
import { usePageTitle } from 'hook/use-page-title'
import useApi from 'hook/use-api'

import { ComojiGalery } from 'components/tool/comoji-galery'
import { Loading } from 'components/ui/loading'
import { NotFoundData } from 'components/ui/not-found-data'
import { TextContainer } from 'components/ui/text-container'

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
		return <NotFoundData />
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
