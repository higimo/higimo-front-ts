import { FunctionComponent } from 'preact'
import { LogismType } from '../../logism/types'

import useApi, { API_STATUS } from '../../../hook/use-api'

import { PrecentationContainer } from '../../ui/precentation-container/PrecentationContainer'
import { TextContainer } from '../../ui/text-container'
import { Loading } from '../../accord/accord-single'
import { NotFoundData } from '../../ui/not-found-data'

import { ROUTE_LINKS } from '../../../dic/ROUTE_LINKS'
import { API_ROUTE } from '../../../api-route'

import './style.css'

export const LogismSingle: FunctionComponent = () => {
	const [ logismDetail ] = useApi<LogismType>(API_ROUTE.logismSingle)
		
	if ([API_STATUS.INIT, API_STATUS.LOADING].includes(logismDetail.status)) {
		return <Loading />
	}

	if (API_STATUS.LOADED === logismDetail.status && !logismDetail.data.length) {
		return <NotFoundData />
	}

	return (
		<PrecentationContainer className="single-logism">
			{logismDetail.data.map(({ text }) => (
				<TextContainer>
					<div
						className="single-logism__text"
						dangerouslySetInnerHTML={{__html: text}}
					/>
				</TextContainer>
			))}
			<TextContainer className="single-logism__navigation">
				<a href={ROUTE_LINKS.logism} className="single-logism__link">Другие логизмы →</a>
			</TextContainer>
		</PrecentationContainer>
	)
}
