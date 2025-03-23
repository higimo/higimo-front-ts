import { FunctionComponent } from 'preact'

import { vkAlumListData } from './data'

export const VkStaticAlbumsList: FunctionComponent = () => (
	<div className="album-list">
		{vkAlumListData.map(item => (
			<a className="album-list__item album" href={item.link}>
				<div className="album__name">{item.name}</div>
				<div className="album__image" style={{ backgroundImage: `url('${item.image}')` }} />
			</a>
		))}
	</div>
)
