import { FunctionComponent } from 'preact'
import { YoutubeType } from 'types'

import useApi, { API_STATUS } from 'hook/use-api'

import { NotFoundData } from 'components/ui/not-found-data'
import { Loading } from 'components/ui/loading'
import { API_ROUTE } from 'dic/api-route'
import { YouTubeElement } from '../youtube-element'

export const YoutubeGalery: FunctionComponent = () => {
	const [ youtubeList ] = useApi<YoutubeType>(API_ROUTE.youtube)
			
	if ([API_STATUS.INIT, API_STATUS.LOADING].includes(youtubeList.status)) {
		return <Loading />
	}

	if (API_STATUS.LOADED === youtubeList.status && !youtubeList.data.length) {
		return <NotFoundData />
	}

	return (
		<div className="gallery-youtube container">
			{youtubeList.data.map(item => (<YouTubeElement {...item} />))}
		</div>
	)
}
