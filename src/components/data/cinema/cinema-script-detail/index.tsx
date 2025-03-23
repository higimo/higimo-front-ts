import { FunctionComponent } from 'preact'
import { CinemaType } from '../../../../types'

import { useRoute } from 'preact-iso'
import useApi, { API_STATUS } from '../../../../hook/use-api'

import { NotFoundPage } from '../../../../pages/not-found-page'

import { TextContainer } from '../../../ui/text-container'
import { Loading } from '../../../accord/accord-single'

import { API_ROUTE } from '../../../../api-route'

export const CinemaScriptDetail: FunctionComponent = () => {
	const { params: { idcode }} = useRoute()
	const [ cinemaDetail ] = useApi<CinemaType>(API_ROUTE.cinemaSingle({ idcode }))

	if ([API_STATUS.INIT, API_STATUS.LOADING].includes(cinemaDetail.status)) {
		return <Loading />
	}

	if (API_STATUS.LOADED === cinemaDetail.status && !cinemaDetail.data.length) {
		return <NotFoundPage />
	}

	document.title = cinemaDetail.data[0].title

	return (
		<TextContainer>
			<h1>Из фильма «{cinemaDetail.data[0].title}»</h1>
			<div
				dangerouslySetInnerHTML={{__html: cinemaDetail.data[0].text}}
			/>
		</TextContainer>
	)
}
