import { FunctionComponent } from 'preact'
import { YoutubeType } from 'api-types/youtube.types'

import { useEmptyDataState } from 'hook/use-empty-data-state'
import { useLoadingState } from 'hook/use-loading-state'
import useApi from 'hook/use-api'

import { Loading } from 'components/ui/loading'
import { NotFoundData } from 'components/ui/not-found-data'
import { YouTubeElement } from 'components/youtube/youtube-element'

import { API_ROUTE } from 'dic/api-route'

export const YoutubeGalery: FunctionComponent = () => {
	const [ youtubeList ] = useApi<YoutubeType[]>(API_ROUTE.youtube)
	const isLoading = useLoadingState([youtubeList.status])
	const isListEmpty = useEmptyDataState(youtubeList.data)

	if (isLoading) {
		return <Loading />
	}

	if (isListEmpty) {
		return <NotFoundData />
	}

	return (
		<div className="gallery-youtube container">
			{youtubeList.data.map(item => (<YouTubeElement {...item} />))}
		</div>
	)
}
