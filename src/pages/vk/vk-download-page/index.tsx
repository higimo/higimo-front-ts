import { FunctionComponent } from 'preact';
import { VkAlbumType, VkPhotoType } from '../../../types';

import { useCallback, useContext, useEffect, useLayoutEffect, useState } from 'preact/hooks';

import { VkContext } from '../../../context/vk';

import { TextContainer } from '../../../components/ui/text-container';
import { Fragment } from 'preact/jsx-runtime';

type QueueType = {
    type: 'album',
    id: number,
    title: string,
}

const VkDownloadAlbum = () => {
    const { isVkLogin, session, fetchLogin } = useContext(VkContext)

    const [ queue, setQueue ] = useState<QueueType[]>([])
    
    const [ albums, setAlbums ] = useState([]);
    const [ photos, setPhotos ] = useState([]);

    useLayoutEffect(() => {
        fetchLogin()
    }, [fetchLogin])

    const getPhotos = useCallback(() => {
        // TODO: Распараллелить запросы
		albums.slice(0, 2).map(album => {
			VK.Api.call('photos.get', {
				owner_id: session.user.id,
				album_id: album.id,
				rev: 0,
				photo_sizes: 1,
				offset: 0,
				count: 600,
				v: '5.199',
			}, response => {
				if (response.response) {
					setPhotos([
                        ...photos,
                        {
                            title: album.title,
                            photos: (response.response.items as VkPhotoType[]).map(item => item.orig_photo.url),
                        },
					])
				} else {
                    // TODO FORM show Message
                    console.error(response)
                }
			})
		})
	}, [albums, session, setPhotos, photos])

    const getAlbums = useCallback(() => {
        if (isVkLogin) {
            VK.Api.call('photos.getAlbums', {
                owner_id: session.user.id,
                need_covers: 1,
                photo_sizes: 1,
                v: 5.199,
            }, response => {
                if (response.response) {
                    const albums = (response.response.items.slice(0, 2) as VkAlbumType[])
                    setQueue([
                        ...queue,
                        ...(albums.map(album => ({
                            type: 'album',
                            id: album.id,
                            title: album.title,
                        })) as QueueType[]),
                    ])
                } else {
                    // TODO show Message
                    console.error(response)
                }
            })
        }
    }, [isVkLogin, session, queue, setQueue])

    useEffect(() => {
        getAlbums()
    }, [])

    useEffect(() => {
        if (queue.length) {
            const headQueue = queue.slice(0, 1)
            const tailQueue = queue.slice(0, 1)
        }
    }, [queue, setQueue])

    // const handleChangeGroupId = useCallback((event) => {
    //     setId('-' + event.target.value)
    //     getAlbums()
    // }, [setId])

    // const handleChangeUserId = useCallback((event) => {
    //     setId(event.target.value)
    //     getAlbums()
    // }, [setId])

    console.log('higimo', {photos, albums})

    return (
        <Fragment>
            <div className="download-page__input">
                {/* <input placeholder="Идентификатор группы" onChange={handleChangeGroupId} /> */}
                {/*  */}
                {/* <input placeholder="Идентификатор пользователя" onChange={handleChangeUserId} /> */}
                <button>Download</button>
            </div>
            <pre className="download-page__pre">
                {JSON.stringify(photos, null, '\t')}
            </pre>
        </Fragment>
    )
}

export const VkDownloadPage: FunctionComponent = () => {
    document.title = 'Скачать свои альбомы'

    return (
        <div className="download-page">
            <h1>Скачать свои альбомы</h1>
            {/* Пока так не работает */}
            {/* <TextContainer>
                <p>
                    Введите ид альбома, скопируйте результат и бахните его в wget
                </p>
                <p>
                    Надо ввести ид группы или юзера. Все его альбомы начнут скачиваться
                </p>
            </TextContainer> */}
            <TextContainer>
                <p>
                    Загрузит фотки из первых попавшихся двух твоих альбомов
                </p>
            </TextContainer>
            <VkDownloadAlbum />
        </div>
    )
}

export default VkDownloadPage
