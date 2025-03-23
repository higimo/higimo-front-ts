import { FunctionComponent } from 'preact'
import { YoutubeType } from '../../../types'

import useApi, { API_STATUS } from '../../../hook/use-api'

import { HorizontalMenu, HorizontalElement } from '../../ui/horizontal-menu'
import { YouTubeElement } from '../../youtube/youtube-element'
import { TextContainer } from '../../ui/text-container'
import { NotFoundData } from '../../ui/not-found-data'
import { Loading } from '../../accord/accord-single'

import { ROUTE_LINKS } from '../../../dic/ROUTE_LINKS'
import { API_ROUTE } from '../../../api-route'

import './style.css'

export const YoutubeOfDay: FunctionComponent = () => {
	const [ youtubeList ] = useApi<YoutubeType>(API_ROUTE.youtube, { limit: 6 })
		
	if ([API_STATUS.INIT, API_STATUS.LOADING].includes(youtubeList.status)) {
		return <Loading />
	}

	if (API_STATUS.LOADED === youtubeList.status && !youtubeList.data.length) {
		return <NotFoundData />
	}

	return (
		<div className="youtube-of-day">
			<TextContainer>
				<h2>Избранное из ютубчика</h2>
			</TextContainer>
			<HorizontalMenu>
				{youtubeList.data.map(item => (<HorizontalElement><YouTubeElement {...item} /></HorizontalElement>))}
			</HorizontalMenu>
			<div>
				<TextContainer className="youtube-of-day__more">
					<a href={ROUTE_LINKS.youtube}>Ещё клёвых видосов →</a>
				</TextContainer>
			</div>
		</div>
	)
}
