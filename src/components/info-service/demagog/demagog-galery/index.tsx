import { FunctionComponent } from 'preact'
import { DemagogType } from 'types'

import useApi from 'hook/use-api'
import { useLoadingState } from 'hook/use-loading-state'
import { useEmptyDataState } from 'hook/use-empty-data-state'

import { Loading } from 'components/ui/loading'

import { NotFoundData } from 'components/ui/not-found-data'
import { DemagogElement } from '../demagog-element'
import { API_ROUTE } from 'dic/api-route'

import './style.css'

export const DemagogGalery: FunctionComponent = () => {
	const [ demagog ] = useApi<DemagogType>(API_ROUTE.demagog)
	const isLoading = useLoadingState([demagog.status])
	const isListEmpty = useEmptyDataState(demagog.data)

	if (isLoading) {
		return <Loading />
	}

	if (isListEmpty) {
		return <NotFoundData />
	}

	return (
		<div className="demagog">
			{demagog.data.map(item => <DemagogElement {...item} />)}
		</div>
	)
}
