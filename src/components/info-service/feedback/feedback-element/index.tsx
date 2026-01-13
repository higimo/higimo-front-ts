import { FunctionComponent } from 'preact'
import { FeedbackType } from '../../../../types'

import { ROUTE_LINKS } from '../../../../dic/ROUTE_LINKS'

export const FeedbackElement: FunctionComponent<FeedbackType> = (props) => (
	<a href={ROUTE_LINKS.feedbackDetail({ idcode: props.id.toString() })} className="feedback-link__link">
		<div className="feedback-link__name">{props.title}</div>
	</a>
)
