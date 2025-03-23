import { FunctionComponent } from 'preact'
import { DemagogType } from '../../../../types'

import useApi, { API_STATUS } from '../../../../hook/use-api'

import { DemagogElement } from '../demagog-element'
import { Loading } from '../../../accord/accord-single'
import { NotFoundData } from '../../../ui/not-found-data'

import { API_ROUTE } from '../../../../api-route'

import './style.css'

export const DemagogGalery: FunctionComponent = () => {
	const [ demagog ] = useApi<DemagogType>(API_ROUTE.demagog)
	
	if ([API_STATUS.INIT, API_STATUS.LOADING].includes(demagog.status)) {
		return <Loading />
	}

	if (API_STATUS.LOADED === demagog.status && !demagog.data.length) {
		return <NotFoundData />
	}

	return (
		<div className="demagog">
			{demagog.data.map(item => <DemagogElement {...item} />)}
		</div>
	)
}
