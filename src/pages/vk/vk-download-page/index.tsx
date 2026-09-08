import { FunctionComponent } from 'preact'

import { usePageTitle } from 'hook/browser/use-page-title'

import { TextContainer } from 'components/ui/text-container'
import { VkDownloadAlbum } from 'components/vk/vk-download-album'

export const VkDownloadPage: FunctionComponent = () => {
	usePageTitle('Скачать свои альбомы')

	return (
		<div className="download-page">
			<TextContainer>
				<h1>Скачать свои альбомы</h1>
			</TextContainer>
			<VkDownloadAlbum />
		</div>
	)
}

export default VkDownloadPage
