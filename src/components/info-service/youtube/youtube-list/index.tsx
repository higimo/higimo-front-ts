import { FunctionComponent } from 'preact'
import { YoutubeType } from 'api-types/youtube.types'

import { YoutubeItem } from 'components/info-service/youtube/youtube-item'

// TODO: [ONE_CLASS_COMPONENT] прям отдельный компонент нужен? Мб, сделать общий с className

type YoutubeListPropsType = {
	youtubeList: YoutubeType[] | null
}

// TODO: [HARD] проставить key и youtubeList?.length && () во всех подобных случаях
// TODO: [HARD] ниже — НЕ ДЕЛАТЬ, найти по ONE_CLASS_COMPONENT и сделать что выше на строчку
// TODO: [HARD] мб, такие компоненты в родителе писать этот несчастный div?
export const YoutubeList: FunctionComponent<YoutubeListPropsType> = ({
	youtubeList
}) => youtubeList && (
	<div className="gallery-youtube container">
		{youtubeList.map(item => (<YoutubeItem {...item} />))}
	</div>
)
