import { FeedbackPageType } from 'types'

import useApi from 'hook/use-api'
import { useLoadingState } from 'hook/use-loading-state'
import { useEmptyDataState } from 'hook/use-empty-data-state'

import { Loading } from 'components/ui/loading'
import { NotFoundData } from 'components/ui/not-found-data'
import { FeedbackCard } from 'components/info-service/feedback/feedback-card'

import { API_ROUTE } from 'dic/api-route'

import './style.css'

export const FeedbackGallery = () => {
	const [ feedbackList ] = useApi<FeedbackPageType>(API_ROUTE.feedback)
	const isLoading = useLoadingState([feedbackList.status])
	const isListEmpty = useEmptyDataState(feedbackList.data)

	if (isLoading) {
		return <Loading />
	}

	if (isListEmpty) {
		return <NotFoundData />
	}

	return (
		<div className="feedback-link">
			{feedbackList.data.map(item => (
				<FeedbackCard {...item} />
			))}
		</div>
	)
}
