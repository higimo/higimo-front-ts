import { ChangeEvent } from 'utils.type'
import { FunctionComponent } from 'preact'
import { VkPhotoType } from 'api-types/vk.types'

import { useCallback } from 'preact/hooks'

import { debounce } from '@github/mini-throttle'
import { getVkPhotosUrl } from 'utils/url-route/get-photos-url'
import { handleVkError } from 'utils/api/handle-errors/handle-vk-error'
import { vkApi } from 'repositories/vk-api.repository'

import { VK_DEBOUNCE_TIMEOUT_LOADING } from 'config/VK_DEBOUNCE_TIMEOUT_LOADING'

import './style.css'

type VkPhotoAlbumEditPropsType = {
	photoList: VkPhotoType[]
}

export const VkPhotoAlbumListEdit: FunctionComponent<VkPhotoAlbumEditPropsType> = ({
	photoList,
}) => {
	// Каждое изменение отправляем в ВК, но дебаунсим, чтоб не ддосить сервера
	const handleChange = useCallback((
		userId: VkPhotoType['owner_id'],
		photoId: VkPhotoType['id']
	) => {
		const debouncedEdit = debounce(
			async (description: string) => {
				if (description.length) {
					try {
						await vkApi.editPhoto(userId, photoId, description)
					} catch (error) {
						handleVkError(error)
					}
				}
			},
			VK_DEBOUNCE_TIMEOUT_LOADING
		)

		return (event: ChangeEvent) => {
			debouncedEdit(event.currentTarget.value)
		}
	}, [])

	return (
		<div className="vk-photos">
			{photoList.map(photo => (
				<div key={photo.id} className="vk-photos__element">
					<img
						src={getVkPhotosUrl(photo.sizes)}
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
