import { VkPhotoType } from 'api-types/vk.types'
import { FunctionComponent } from 'preact'

import { getPhotosUrl } from 'utils/get-photos-url'

import './style.css'

type VkPhotoToolAlbumEditPropsType = {
	photos: VkPhotoType[]
}

export const VkPhotoToolAlbumEdit: FunctionComponent<VkPhotoToolAlbumEditPropsType> = ({ photos }) => (
	<div className="vk-photos">
		{photos.map(photo => (
			<div key={photo.id} className="vk-photos__element">
				<img
					src={getPhotosUrl(photo.sizes)}
					className="vk-photos__photo"
				/>
				{/* TODO: [MIDDLE] Надо редактирование всё же прикрутить */}
				<textarea className="vk-photos__comment">{photo.text}</textarea>
			</div>
		))}
	</div>
)
