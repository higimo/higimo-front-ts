import { FunctionComponent } from 'preact'

import { usePageTitle } from 'hook/use-page-title';

import { FeedbackItem } from 'components/info-service/feedback/feedback-item'

import '../../feedback-style.css'

export const FeedbackSinglePage: FunctionComponent = () => {
	usePageTitle('Багрепорты от higimo')

	return (
		<div className="feedback-page">
			<FeedbackItem />
		</div>
	)
}
