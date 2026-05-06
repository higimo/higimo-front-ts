import { FunctionComponent } from 'preact'
import { ComojiType } from 'api-types/comoji.types'

import useApi from 'hook/use-api'
import { useLoadingState } from 'hook/use-loading-state'
import { useEmptyDataState } from 'hook/use-empty-data-state'

import { TextContainer } from 'components/ui/text-container'
import { Loading } from 'components/ui/loading'
import { NotFoundData } from 'components/ui/not-found-data'
import { ComojiElement } from 'components/tool/comoji-element'

import { API_ROUTE } from 'dic/api-route'

import './style.css'

export const ComojiGalery: FunctionComponent = () => {
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
		<TextContainer>
			<div className="gallery-comoji">
				{comojiList.data.map(item => <ComojiElement {...item} />)}
			</div>
		</TextContainer>
	)
}
