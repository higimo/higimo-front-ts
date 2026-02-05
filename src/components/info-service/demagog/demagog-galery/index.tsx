import { FunctionComponent } from 'preact'
import { DemagogType } from 'types'

import { useEmptyDataState } from 'hook/use-empty-data-state'
import { useLoadingState } from 'hook/use-loading-state'
import useApi from 'hook/use-api'

import { DemagogElement } from 'components/info-service/demagog/demagog-element'
import { Loading } from 'components/ui/loading'
import { NotFoundData } from 'components/ui/not-found-data'

import { API_ROUTE } from 'dic/api-route'

import './style.css'

export const DemagogGalery: FunctionComponent = () => {
	const [ demagogList ] = useApi<DemagogType[]>(API_ROUTE.demagog)
	const isLoading = useLoadingState([demagogList.status])
	const isListEmpty = useEmptyDataState(demagogList.data)

	if (isLoading) {
		return <Loading />
	}

	if (isListEmpty) {
		return <NotFoundData />
	}

	return (
		<div className="demagog">
			{demagogList.data.map(item => <DemagogElement {...item} />)}
		</div>
	)
}
