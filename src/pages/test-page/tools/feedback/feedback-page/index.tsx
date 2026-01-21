import { FunctionComponent } from 'preact'

import { usePageTitle } from 'hook/use-page-title'

import { TextContainer } from 'components/ui/text-container'
import { FeedbackGallery } from 'components/info-service/feedback/feedback-gallery'

import '../../feedback-style.css'

export const FeedbackIndexPage: FunctionComponent = () => {
	usePageTitle('Багрепорты от higimo')

	return (
		<div className="feedback-page">
			<TextContainer>
				<h1>Багрепорты от higimo</h1>
				<p>
					Этот сайт создавался для того, чтобы показать безболезненность и полную необходимость обратной связи. Администратору любого сайта или продукта можно написать письмо и исправить проблему, которая мешает вам жить.
				</p>
			</TextContainer>
			<FeedbackGallery />
		</div>
	)
}
