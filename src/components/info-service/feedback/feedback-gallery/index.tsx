import { Loading } from 'components/ui/loading'

import './style.css'
import { NotFoundData } from 'components/ui/not-found-data'
import { API_ROUTE } from 'dic/api-route'
import useApi, { API_STATUS } from 'hook/use-api'
import { FeedbackType } from 'types'
import { FeedbackElement } from '../feedback-element'

export const FeedbackGallery = () => {
	const [ feedbackList ] = useApi<FeedbackType>(API_ROUTE.feedback)
	
	if ([API_STATUS.INIT, API_STATUS.LOADING].includes(feedbackList.status)) {
		return <Loading />
	}

	if (API_STATUS.LOADED === feedbackList.status && !feedbackList.data.length) {
		return <NotFoundData />
	}

	return (
		<div className="feedback-link">
			{feedbackList.data.map(item => (
				<FeedbackElement {...item} />
			))}
		</div>
	)
}
