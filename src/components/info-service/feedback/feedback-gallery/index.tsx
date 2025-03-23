import { FeedbackType } from "../../../../types"

import useApi, { API_STATUS } from "../../../../hook/use-api"

import { FeedbackElement } from "../feedback-element"
import { NotFoundData } from "../../../ui/not-found-data"
import { Loading } from "../../../accord/accord-single"

import { API_ROUTE } from "../../../../api-route"

import './style.css'

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
