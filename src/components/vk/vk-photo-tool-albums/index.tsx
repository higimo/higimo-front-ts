import { FunctionComponent } from "preact";
import { VKAlbumType } from "../../../types";

import { useContext, useEffect, useState } from "preact/hooks";

import { VkContext } from "../../../context/vk";

import { VkAlbumElement } from "../vk-album-element";

export const VkPhotoAlbumList: FunctionComponent = () => {
	const { isVkLogin, session } = useContext(VkContext)
	const [ albums, setAlbums ] = useState<VKAlbumType[]>([]);

	useEffect(() => {
		if (isVkLogin) {
			VK.Api.call('photos.getAlbums', {
				owner_id: session.user.id,
				need_covers: 1,
				photo_sizes: 1,
				v: 5.199,
			}, response => {
				if (response.response) {
					setAlbums(response.response.items)
				} else {
					// TODO FORM show Message
					console.error(response)
				}
			})
		}
	}, [isVkLogin, session])

	return (
		<div className="album">
			<div className="album__list">
				{albums.map(album => (
					<VkAlbumElement key={album.id} {...album} />
				))}
			</div>
		</div>
	)
}