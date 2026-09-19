import { ChangeEvent } from 'utils.type'
import { FunctionComponent } from 'preact'
import { VkPhotoType } from 'api-types/vk.types'

import { useCallback } from 'preact/hooks'

import { debounce } from '@github/mini-throttle'
import { getPhotosUrl } from 'utils/get-photos-url'
import { VkServiceApi } from 'pages/vk/vk-api-service'

import './style.css'

type VkPhotoToolAlbumEditPropsType = {
	photos: VkPhotoType[]
}

// TODO: не нравится название компонента
export const VkPhotoToolAlbumEdit: FunctionComponent<VkPhotoToolAlbumEditPropsType> = ({ photos }) => {
	const handleChange = useCallback((
		userId: VkPhotoType['owner_id'],
		photoId: VkPhotoType['id']
	) => {
		const debouncedEdit = debounce(
			(description: string) => {
				console.log('lets go into debounce')
				if (description.length) {
					// TODO: надо ли await и сообщать об ошибках?
					VkServiceApi.editPhoto(userId, photoId, description)
				}
			},
			1500 // 1,5 секунды
		)

		return (event: ChangeEvent) => {
			console.log('declarate debounce')
			debouncedEdit(event.currentTarget.value)
		}
	}, [])

	return (
		<div className="vk-photos">
			{photos.map(photo => (
				<div key={photo.id} className="vk-photos__element">
					<img
						src={getPhotosUrl(photo.sizes)}
						className="vk-photos__photo"
					/>
					<textarea
						className="vk-photos__comment"
						onChange={handleChange(photo.owner_id, photo.id)}
					>
						{photo.text}
					</textarea>
				</div>
			))}
		</div>
	)
}
