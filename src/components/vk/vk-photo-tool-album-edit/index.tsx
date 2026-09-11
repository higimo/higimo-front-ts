import { VkPhotoType } from 'api-types/vk.types'
import { FunctionComponent } from 'preact'

import { getPhotosUrl } from 'utils/get-photos-url'

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
