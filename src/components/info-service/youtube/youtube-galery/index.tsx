import { FunctionComponent } from 'preact'
import { YoutubeType } from 'api-types/youtube.types'

import { YouTubeElement } from 'components/info-service/youtube/youtube-element'

type YoutubeGaleryPropsType = {
	youtubeList: YoutubeType[] | null
}

// TODO: [HARD] мб, такие компоненты в родителе писать этот несчастный div?
export const YoutubeGalery: FunctionComponent<YoutubeGaleryPropsType> = ({
	youtubeList
}) => youtubeList && (
	<div className="gallery-youtube container">
		{youtubeList.map(item => (<YouTubeElement {...item} />))}
	</div>
)
