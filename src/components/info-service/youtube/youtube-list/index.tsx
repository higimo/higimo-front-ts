import { FunctionComponent } from 'preact'
import { YoutubeType } from 'api-types/youtube.types'

import { YoutubeItem } from 'components/info-service/youtube/youtube-item'

type YoutubeListPropsType = {
	youtubeList: YoutubeType[] | null
}

export const YoutubeList: FunctionComponent<YoutubeListPropsType> = ({
	youtubeList
}) => youtubeList && (
	<div className="gallery-youtube container">
		{youtubeList.map(item => (
			<YoutubeItem key={item.code} {...item} />
		))}
	</div>
)
