import { FunctionComponent } from 'preact'

import { FeedbackItem } from '../../../../../components/info-service/feedback/feedback-item'

import '../../feedback-style.css'

export const FeedbackSinglePage: FunctionComponent = () => {
	document.title = 'Багрепорты от higimo'

	return (
		<div className="feedback-page">
			<FeedbackItem />
		</div>
	)
}
