import { FunctionComponent } from 'preact'
import { VKAlbumType } from 'types'

import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'

export const VkAlbumElement: FunctionComponent<VKAlbumType> = (album) => (
	<a href={ROUTE_LINKS.toolVkAlbumSingle({ albumId: album.id })} className="album-element">
		<div className="album-element__meta">
			<div className="album-element__title">
				<span dangerouslySetInnerHTML={{__html: album.privacy_view.type !== 'all' ? '🔒' : ''}} />
				{album.title} | {album.size}
			</div>
			<div className="album-element__description" dangerouslySetInnerHTML={{__html: album.description}} />
		</div>
		<img
			className="album-element__image"
			src={album.sizes.filter(i => i.type == 'x')[0].src}
		/>
	</a>
)