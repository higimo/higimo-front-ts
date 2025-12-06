import { FunctionComponent } from 'preact'
import { LectionType } from 'types'

import useApi from 'hook/use-api'
import { useLoadingState } from 'hook/use-loading-state'
import { useEmptyDataState } from 'hook/use-empty-data-state'

import { Loading } from 'components/ui/loading'
import { NotFoundData } from 'components/ui/not-found-data'

import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'
import { API_ROUTE } from 'dic/api-route'

import './style.css'

export const ObuchenieList: FunctionComponent = () => {
	const [ lectionList ] = useApi<LectionType>(API_ROUTE.lection)
	const isLoading = useLoadingState([lectionList.status])
	const isListEmpty = useEmptyDataState(lectionList.data)

	if (isLoading) {
		return <Loading />
	}

	if (isListEmpty) {
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
