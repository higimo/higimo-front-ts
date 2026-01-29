import { FunctionComponent } from 'preact'
import { FeedbackPageType } from 'types'

import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'

export const FeedbackCard: FunctionComponent<FeedbackPageType> = (props) => (
	<a href={ROUTE_LINKS.feedbackDetail({ idcode: props.id.toString() })} className="feedback-link__link">
		<div className="feedback-link__name">{props.title}</div>
	</a>
)
