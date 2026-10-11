import { FunctionComponent } from 'preact'
import { YoutubeType } from 'api-types/youtube.types'

import { YouTubeElement } from 'components/info-service/youtube/youtube-item'

// TODO: [ONE_CLASS_COMPONENT] прям отдельный компонент нужен? Мб, сделать общий с className

type YoutubeGaleryPropsType = {
	youtubeList: YoutubeType[] | null
}

// TODO: [HARD] мб, такие компоненты в родителе писать этот несчастный div?
export const YoutubeList: FunctionComponent<YoutubeGaleryPropsType> = ({
	youtubeList
}) => youtubeList && (
	<div className="gallery-youtube container">
		{youtubeList.map(item => (<YouTubeElement {...item} />))}
	</div>
)
