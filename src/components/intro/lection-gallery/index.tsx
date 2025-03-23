import { FunctionComponent } from 'preact'
import { LectionType } from '../../../types'

import useApi, { API_STATUS } from '../../../hook/use-api'

import { Poster } from '../../ui/poster'
import { NotFoundData } from '../../ui/not-found-data'
import { Loading } from '../../accord/accord-single'

import { ROUTE_LINKS } from '../../../dic/ROUTE_LINKS'
import { API_ROUTE } from '../../../api-route'

import './style.css'

export const LectionGallery: FunctionComponent = () => {
	const [ lectionList ] = useApi<LectionType>(API_ROUTE.lection)
		
	if ([API_STATUS.INIT, API_STATUS.LOADING].includes(lectionList.status)) {
		return <Loading />
	}

	if (API_STATUS.LOADED === lectionList.status && !lectionList.data.length) {
		return <NotFoundData />
	}

	return (
		<div className="obuchenie-list">
			{lectionList.data.map(({ id, name, code }) => {
				const [, number, title] = name.match(/(Лекция \S+?)\.(.*)/)
				return (
					<Poster key={id} className="obuchenie-list__item">
						<a href={ROUTE_LINKS.learningDetail({ idcode: code })} className="obuchenie-list__link">
							<div className="obuchenie-list__title">
								{title}
							</div>
							<div className="obuchenie-list__number">
								{number}
							</div>
						</a>
					</Poster>
				)
			})}
		</div>
	)
}
