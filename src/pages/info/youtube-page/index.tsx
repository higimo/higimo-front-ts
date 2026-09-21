import { FunctionComponent } from 'preact'
import { YoutubeType } from 'api-types/youtube.types'

import { useEmptyDataState } from 'hook/fetch/use-empty-data-state'
import { useLoadingState } from 'hook/fetch/use-loading-state'
import { usePageTitle } from 'hook/browser/use-page-title'
import { useApi } from 'hook/fetch/use-api'

import { Loading } from 'components/ui/loading'
import { NotFoundData } from 'components/ui/not-found-data'
import { YoutubeGalery } from 'components/info-service/youtube/youtube-galery'

import { API_ROUTE } from 'dic/API_ROUTE'

export const YoutubePage: FunctionComponent = () => {
	usePageTitle('Избранные видосы')

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
		<YoutubeGalery list={youtubeList.data} />
	)
}
