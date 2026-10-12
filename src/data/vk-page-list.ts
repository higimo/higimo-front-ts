import { LinkDataType } from 'utils.type'

import { ROUTE_LINK } from 'dic/route/ROUTE_LINK'

export const VK_PAGE_LIST: LinkDataType[] = [
	{
		title: 'Скачать фотки из альбома',
		href: ROUTE_LINK.toolVkDownloadAlbum,
		description: 'Инструмент выгрузки ссылок на файлы картинок',
	},
	{
		title: 'Редактирование альбомов',
		href: ROUTE_LINK.toolVkAlbums,
		description: 'Сортировка и описания фотографий в более удобном для массового редактирования виде',
	}
] as const
