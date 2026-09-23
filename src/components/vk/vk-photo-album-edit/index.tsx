import { ChangeEvent } from 'utils.type'
import { FunctionComponent } from 'preact'
import { VkPhotoType } from 'api-types/vk.types'

import { useCallback } from 'preact/hooks'

import { debounce } from '@github/mini-throttle'
import { getPhotosUrl } from 'utils/get-photos-url'
import { toast } from 'toast'
import { VkServiceApi } from 'repositories/vk-api-service'

import './style.css'

type VkPhotoAlbumEditPropsType = {
	photos: VkPhotoType[]
}

export const VkPhotoAlbumEdit: FunctionComponent<VkPhotoAlbumEditPropsType> = ({ photos }) => {
	// Каждое изменение отправляем в ВК, но дебаунсим, чтоб не ддосить сервера
	const handleChange = useCallback((
		userId: VkPhotoType['owner_id'],
		photoId: VkPhotoType['id']
	) => {
		const debouncedEdit = debounce(
			async (description: string) => {
				if (description.length) {
					const result = await VkServiceApi.editPhoto(userId, photoId, description)
					if (!result) {
						toast.error('ВК отказал в изменении')
					}
				}
			},
			1500 // 1,5 секунды
		)

		return (event: ChangeEvent) => {
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
