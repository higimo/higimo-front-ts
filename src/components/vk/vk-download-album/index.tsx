import { FunctionComponent, Fragment } from 'preact';
import { useContext, useState, useLayoutEffect, useCallback, useEffect } from 'preact/hooks';
import { useMessage } from 'components/ui/message-container/useMessage';
import { TextContainer } from 'components/ui/text-container';
import { VKAlbumType } from 'types';
import { printVkError } from 'utils/print-vk-error';
import { useQueue } from 'hook/use-queue';
import { VkApi } from 'utils/VkApi';

import './style.css'
import { VkContext } from 'context/vk';

export const ALBUM_MAX_COUNT = 3;
export const QUEUE_TIMER = 1500;

type QueueType = {
	type: 'album';
	id: VKAlbumType['id'];
	title: VKAlbumType['title'];
};

export const VkDownloadAlbum: FunctionComponent = () => {
	const { isVkLogin, session, fetchLogin } = useContext(VkContext);
	const { size, push, pull, view } = useQueue<QueueType>();
	const [photos, setPhotos] = useState([]);
	const { showMessage, MessageContainer } = useMessage();

	useLayoutEffect(() => {
		fetchLogin();
	}, [fetchLogin]);

	const getPhotos = useCallback(async (downloadId: string, albumId: VKAlbumType['id'], title: string) => {
		if (isVkLogin) {
			try {
				const photos = await VkApi.getPhotos(downloadId, albumId);
				setPhotos(preState => [
					...preState,
					{
						title: title,
						photos: photos.map(item => item.orig_photo.url),
					},
				]);
			} catch (vkError) {
				showMessage(printVkError(vkError));
			}
		}
	}, [isVkLogin, setPhotos, showMessage]);

	const getAlbums = useCallback(async (downloadId: string) => {
		if (isVkLogin) {
			try {
				const albums = await VkApi.getAlbums(session.user.id, downloadId);

				showMessage(`Всего альбомов ${albums.length}, беру первые ${ALBUM_MAX_COUNT}`);
				albums.slice(0, ALBUM_MAX_COUNT).map(album => {
					push({
						type: 'album',
						id: album.id,
						title: album.title,
					});
				});
			} catch (vkError) {
				showMessage(printVkError(vkError));
			}
		}
	}, [isVkLogin, session, push, showMessage]);

	const [downloadId, setDownloadId] = useState(null);
	const handleChangeDownloadId = useCallback((value) => {
		setDownloadId(value);
		setPhotos([]);
	}, [setDownloadId, setPhotos]);
	const handleGroupId = useCallback(event => handleChangeDownloadId('-' + event.target.value), [handleChangeDownloadId]);
	const handleUserId = useCallback(event => handleChangeDownloadId(event.target.value), [handleChangeDownloadId]);
	const handleSelf = useCallback(() => handleChangeDownloadId(session.user.id), [handleChangeDownloadId, session]);

	useEffect(() => {
		if (isVkLogin && downloadId) {
			getAlbums(downloadId);
		}
	}, [isVkLogin, downloadId]);

	useEffect(() => {
		if (size) {
			const headQueue = view();
			if (headQueue.type === 'album') {
				showMessage(`Осталось скачать ${size} альбома`);
				getPhotos(downloadId, headQueue.id, headQueue.title);
			}

			setTimeout(() => pull(), QUEUE_TIMER);
		}
	}, [downloadId, size, view, pull]);

	return (
		<Fragment>
			<TextContainer>
				<p>
					Введите ид альбома, скопируйте результат и бахните его в wget
				</p>
				<p>
					Загрузит фотки из первых попавшихся {ALBUM_MAX_COUNT} твоих альбомов. Таймаут загрузки {QUEUE_TIMER / 1000}, чтобы не дудосить серваки ВК.
				</p>
			</TextContainer>
			<TextContainer className="download-page__input">
				<div>
					<div>Ид группы</div>
					<input placeholder="120" onChange={handleGroupId} />
				</div>
				<div>
					<div>Ид пользователя</div>
					<input placeholder="510" onChange={handleUserId} />
				</div>
				<div>
					Тут всё автоматически
					<button onClick={handleSelf}>Скачать свои</button>
				</div>
			</TextContainer>
			<TextContainer>
				<MessageContainer />
			</TextContainer>
			<TextContainer>
				<h2>Результат</h2>
			</TextContainer>
			<textarea className="download-page__pre">
				{JSON.stringify(photos, null, '\t')}
			</textarea>
		</Fragment>
	);
};
