import { VkPhotoType } from 'api-types/vk.types'
import { FunctionComponent } from 'preact'

// TODO: [LIGHT] перенести в utils
const getPhotosUrl = (sizes: VkPhotoType['sizes']): string => {
	const finded = sizes.find(item => item.type === 'r' || item.type === 'x')
	if (finded) {
		return finded.url
	}
	return ''
}

type VkPhotoToolAlbumEditPropsType = {
	photos: VkPhotoType[]
}

export const VkPhotoToolAlbumEdit: FunctionComponent<VkPhotoToolAlbumEditPropsType> = ({ photos }) => (
	<div className="album-sort-page">
		<div>
			{photos.map(photo => (
				<div key={photo.id}>
					<img src={getPhotosUrl(photo.sizes)} />
					<br />
					<textarea>{photo.text}</textarea>
				</div>
			))}
		</div>
	</div>
)
