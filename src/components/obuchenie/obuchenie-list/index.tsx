import { FunctionComponent } from 'preact'
import { LectionType } from 'types'

import useApi, { API_STATUS } from 'hook/use-api'

import { Loading } from 'components/ui/loading'
import { NotFoundData } from 'components/ui/not-found-data'

import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'

import './style.css'
import { API_ROUTE } from 'dic/api-route'

export const ObuchenieList: FunctionComponent = () => {
	const [ lectionList ] = useApi<LectionType>(API_ROUTE.lection)
		
	if ([API_STATUS.INIT, API_STATUS.LOADING].includes(lectionList.status)) {
		return <Loading />
	}

	if (API_STATUS.LOADED === lectionList.status && !lectionList.data.length) {
		return <NotFoundData />
	}

	return (
		<div className="obuchenie-list">
			{lectionList.data.map(({ id, name, code }) => (
				<a key={id} href={ROUTE_LINKS.learningDetail({ idcode: code })} className="obuchenie-list__link">{name}</a>
			))}
		</div>
	)
}
