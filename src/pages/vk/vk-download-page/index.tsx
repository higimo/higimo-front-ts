import { FunctionComponent } from 'preact'

import { usePageTitle } from 'hook/browser/use-page-title'
import { useVkDownload } from 'pages/vk/use-vk-download'

import { Breadcrumps } from 'components/ui/breadcrumps'
import { TextContainer } from 'components/ui/text-container'
import { VkDownloadForm } from 'components/vk/vk-download-form'
import { VkHeading } from 'components/vk/vk-heading'
import { VkParagraph } from 'components/vk/vk-paragraph'
import { VkSdkLoader } from 'components/vk/vk-sdk-loader'

import { ALBUM_MAX_COUNT, QUEUE_TIMER } from 'components/vk/consts'

import '../vk-style.css'
import './style.css'

export const VkDownloadPage: FunctionComponent = () => {
	usePageTitle('Скачать свои альбомы')

	const {
		onSubmit,
		photos,
	} = useVkDownload()

	return (
		<div className="vk-identity-page download-page">
			<VkSdkLoader />

			<TextContainer>
				<Breadcrumps />
			</TextContainer>

			<TextContainer>
				<VkHeading>Скачать свои альбомы</VkHeading>
				<VkParagraph>
					Введите ид альбома, скопируйте результат и бахните его в wget
				</VkParagraph>
				<VkParagraph>
					Загрузит фотки из первых попавшихся {ALBUM_MAX_COUNT} твоих альбомов. Таймаут загрузки {QUEUE_TIMER / 1000}, чтобы не дудосить серваки ВК.
				</VkParagraph>
			</TextContainer>

			<TextContainer>
				<VkDownloadForm
					onSubmit={onSubmit}
				/>
			</TextContainer>

			<TextContainer>
				<VkHeading level={2}>Результат</VkHeading>
			</TextContainer>

			<textarea className="download-page__pre">
				{JSON.stringify(photos, null, '\t')}
			</textarea>
		</div>
	)
}
