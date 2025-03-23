import { FunctionComponent } from 'preact'
import { ComojiType } from '../../../types'

import useApi, { API_STATUS } from '../../../hook/use-api'

import { ComojiElement } from '../comoji-element'
import { TextContainer } from '../../ui/text-container'
import { Loading } from '../../accord/accord-single'
import { NotFoundData } from '../../ui/not-found-data'

import { API_ROUTE } from '../../../api-route'

import './style.css'

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
