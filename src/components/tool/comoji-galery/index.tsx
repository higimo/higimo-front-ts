import { FunctionComponent } from 'preact'
import { ComojiType } from 'types'

import useApi, { API_STATUS } from 'hook/use-api'

import { TextContainer } from 'components/ui/text-container'
import { Loading } from 'components/ui/loading'
import { NotFoundData } from 'components/ui/not-found-data'
import './style.css'
import { API_ROUTE } from 'dic/api-route'
import { ComojiElement } from '../comoji-element'

export const ComojiGalery: FunctionComponent = () => {
	const [ comojiList ] = useApi<ComojiType>(API_ROUTE.comoji)
			
	if ([API_STATUS.INIT, API_STATUS.LOADING].includes(comojiList.status)) {
		return <Loading />
	}

	if (API_STATUS.LOADED === comojiList.status && !comojiList.data.length) {
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
