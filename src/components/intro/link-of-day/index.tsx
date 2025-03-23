import { FunctionComponent } from 'preact'
import { LinksType } from '../../../types'

import useApi, { API_STATUS } from '../../../hook/use-api'

import { TextContainer } from '../../ui/text-container'
import { LinksElement } from '../../info-service/links/links-element'
import { Loading } from '../../accord/accord-single'

import { API_ROUTE } from '../../../api-route'

import './style.css'

export const LinkOfDay: FunctionComponent = () => {
	const [ linkList ] = useApi<LinksType>(API_ROUTE.link)
		
	if ([API_STATUS.INIT, API_STATUS.LOADING].includes(linkList.status)) {
		return <Loading />
	}

	if (API_STATUS.LOADED === linkList.status && !linkList.data.length) {
		return null
	}

	return (
		<div className="link-of-day">
			<TextContainer><h2>Ссылка дня</h2></TextContainer>
			<div className="link-of-day__gallery">
				<LinksElement {...linkList[0]} />
			</div>
		</div>
	)
}
