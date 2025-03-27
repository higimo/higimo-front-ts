import { FunctionComponent } from 'preact'
import { LogismType } from '../types'

import cs from 'classnames'

import useApi, { API_STATUS } from '../../../hook/use-api'

import { Loading } from '../../accord/accord-single'
import { NotFoundData } from '../../ui/not-found-data'

import { API_ROUTE } from '../../../api-route'

import '../logism/style.css'

export const Logism: FunctionComponent = () => {
	const [ logismList ] = useApi<LogismType>(API_ROUTE.logism)
		
	if ([API_STATUS.INIT, API_STATUS.LOADING].includes(logismList.status)) {
		return <Loading />
	}

	if (API_STATUS.LOADED === logismList.status && !logismList.data.length) {
		return <NotFoundData />
	}

	return (
		<div className="gallery-logism">
			{logismList.data.map(({ text }) => (
				<div
					className={cs('gallery-logism__item', {
						'gallery-logism__item--long': text.length > 100
					})}
					dangerouslySetInnerHTML={{ __html: text.replace(/(https?:\/\/.*)/g, '<a href="$1">источник</a>') }}
				/>
			))}
		</div>
	)
}
