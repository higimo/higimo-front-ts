import { VKAlbumType, VkPhotoType } from 'api-types/vk.types';

export type VkQueueType = {
	type: 'album';
	id: VKAlbumType['id'];
	title: VKAlbumType['title'];
};
export type VkPhotosContentType = {
	title: VKAlbumType['title'];
	photos: VkPhotoType['orig_photo']['url'][];
};
