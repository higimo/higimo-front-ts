import { FunctionComponent } from 'preact'
import { VKAlbumType } from 'api-types/vk.types'

import { ROUTE_LINK } from 'dic/route/ROUTE_LINK'

export const VkPhotoAlbumItem: FunctionComponent<VKAlbumType> = (album) => (
	<a href={ROUTE_LINK.toolVkAlbumSingle({ albumId: album.id })} className="album-element">
		<div className="album-element__meta">
			<div className="album-element__title">
				<span dangerouslySetInnerHTML={{__html: album.is_locked ? '🔒' : ''}} />
				{album.title} | {album.size}
			</div>
			<div className="album-element__description" dangerouslySetInnerHTML={{__html: album.description}} />
		</div>
		<img
			className="album-element__image"
			src={album.sizes.filter(i => i.type == 'x')[0]!.src}
		/>
	</a>
)
