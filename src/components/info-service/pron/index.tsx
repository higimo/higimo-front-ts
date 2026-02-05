import { FunctionComponent } from 'preact'

import { useEmptyDataState } from 'hook/use-empty-data-state'
import { useLoadingState } from 'hook/use-loading-state'
import useApi from 'hook/use-api'

import { Loading } from 'components/ui/loading'
import { NotFoundData } from 'components/ui/not-found-data'

import { API_ROUTE } from 'dic/api-route'

import './style.css'

type PronType = {
	code: string
}

export const PronIndex: FunctionComponent = () => {
	const [ pronList ] = useApi<PronType[]>(API_ROUTE.pron)
	const isLoading = useLoadingState([pronList.status])
	const isListEmpty = useEmptyDataState(pronList.data)

	if (isLoading) {
		return <Loading />
	}

	if (isListEmpty) {
		return <NotFoundData />
	}

	return (
		<div className="gallery-pron container">
			<button
				className="gallery-pron__btn"
				onClick={() => {pronList.data.forEach(i => window.open(`https://rt.pornhub.com/view_video.php?viewkey=${i.code}`))}}
			>
				Открыть порцию
			</button>
		</div>
	)
}
