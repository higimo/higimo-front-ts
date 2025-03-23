import { albumListData } from './data'

export const TourismAlbum = () => (
	<div className="album-list">
		{albumListData.map(item => (
			<a href={item.link} className="album-list__item album">
				<div className="album__name">{item.name}</div>
				<div className="album__image" style={{ backgroundImage: `url('${item.image}')` }} />
			</a>
		))}
	</div>
)
