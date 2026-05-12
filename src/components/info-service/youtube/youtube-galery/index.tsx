import { FunctionComponent } from 'preact'
import { YoutubeType } from 'api-types/youtube.types'

import { YouTubeElement } from 'components/info-service/youtube/youtube-element'

type YoutubeGaleryPropsType = {
	list: YoutubeType[]
}
export const YoutubeGalery: FunctionComponent<YoutubeGaleryPropsType> = ({ list }) => {
	return (
		<div className="gallery-youtube container">
			{list.map(item => (<YouTubeElement {...item} />))}
		</div>
	)
}
