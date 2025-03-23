import { FunctionComponent } from 'preact'
import { FeedbackType } from '../../../types'

import useApi, { API_STATUS } from '../../../hook/use-api'

import { TextContainer } from '../../ui/text-container'
import { FeedbackElement } from '../../info-service/feedback/feedback-element'
import { Loading } from '../../accord/accord-single'
import { NotFoundData } from '../../ui/not-found-data'

import { API_ROUTE } from '../../../api-route'

import './style.css'

// TODO: Нужен алгоритм распределения айдишников по дням недели

const getElementForToday = (elements: FeedbackType[]): FeedbackType => {
    const today = new Date();

    const startOfYear = new Date(today.getFullYear(), 0, 0);
    const diff = today.getTime() - startOfYear.getTime();
    const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
    const index = dayOfYear % elements.length;

    return elements[index];
}

export const BugreportOfDay: FunctionComponent = () => {
	const [ feedbackList ] = useApi<FeedbackType>(API_ROUTE.feedback)

	if ([API_STATUS.INIT, API_STATUS.LOADING].includes(feedbackList.status)) {
		return <Loading />
	}

	if (API_STATUS.LOADED === feedbackList.status && !feedbackList.data.length) {
		return <NotFoundData />
	}

	const feedbackElement = getElementForToday(feedbackList.data)

	return (
		<div className="bugreport-of-day">
			<TextContainer>
				<h2>Багрепорт дня</h2>
			</TextContainer>
			<TextContainer>
				<div className="feedback-link">
					<FeedbackElement {...feedbackElement} />
				</div>
			</TextContainer>
		</div>
	)
}
