import { FunctionComponent } from 'preact'
import { LogismType } from 'components/logism/types'

import cs from 'classnames'

import useApi from 'hook/use-api'
import { useLoadingState } from 'hook/use-loading-state'
import { useEmptyDataState } from 'hook/use-empty-data-state'

import { Loading } from 'components/ui/loading'
import { NotFoundData } from 'components/ui/not-found-data'

import { API_ROUTE } from 'dic/api-route'

import '../logism/style.css'

export const Logism: FunctionComponent = () => {
	const [ logismList ] = useApi<LogismType>(API_ROUTE.logism)
	const isLoading = useLoadingState([logismList.status])
	const isListEmpty = useEmptyDataState(logismList.data)

	if (isLoading) {
		return <Loading />
	}

	if (isListEmpty) {
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
