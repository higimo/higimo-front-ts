import { Fragment, FunctionComponent } from 'preact'
import { FeedbackElement, FeedbackType } from '../../../../types'

import { useRoute } from 'preact-iso'
import useApi, { API_STATUS } from '../../../../hook/use-api'

import { Loading } from '../../../accord/accord-single'
import { NotFoundData } from '../../../ui/not-found-data'

import { ROUTE_LINKS } from '../../../../dic/ROUTE_LINKS'
import { API_ROUTE } from '../../../../api-route'

import './style.css'

type GetBasenameType = (string) => string
const getBasename: GetBasenameType = (str) => (str + '').substring(str.lastIndexOf('/') + 1)

type GetRandomElementFromArrayType = <T>(arr: T[]) => T | null
const getRandomElementFromArray: GetRandomElementFromArrayType = (arr) => (arr.length < 1) ? null : arr[Math.floor(Math.random() * (arr.length + 1))]

export const FeedbackItem: FunctionComponent = () => {
	const { params: { idcode = '' }} = useRoute()

	const [ blockElementList ] = useApi<FeedbackElement>(API_ROUTE.feedbackBlock({ idcode }))
	const [ feedbackList ] = useApi<FeedbackType>(API_ROUTE.feedback)
	
	if (([API_STATUS.INIT, API_STATUS.LOADING].includes(blockElementList.status)) ||
		([API_STATUS.INIT, API_STATUS.LOADING].includes(feedbackList.status))) {
		return <Loading />
	}

	if ((API_STATUS.LOADED === blockElementList.status && !blockElementList.data.length) ||
		(API_STATUS.LOADED === feedbackList.status && !feedbackList.data.length) ||
		!idcode.length) {
		return <NotFoundData />
	}

	// window.scrollTo({ top: 0, behavior: 'smooth' })

	const nextFeed = getRandomElementFromArray<FeedbackType>(feedbackList.data)

	return (
		<Fragment>
			<div className="feed">
				{blockElementList.data.map(({ create_at, name, theme, text, image, file }) => {
					if (theme) {
						return <h1 title={document.title = theme}>{theme}</h1>
					} else {
						return (
							<div className="feedback-element">
								{!!image && (
									<div className="feedback__image">
										{image.split(',').map(filename => (
											<img src={`http://higimo.ru${filename}`} />
										))}
									</div>
								)}
								{!!file && (
									<div className="feedback__file">
										{file.split(',').map(filename => (
											<a href={`http://higimo.ru${filename}`}>{getBasename(filename)}</a>
										))}
									</div>
								)}
								<div className="feedback__meta">
									<div className="feedback__name">{name}</div>
									<div className="feedback__date">{new Date(parseInt(create_at, 10)).toLocaleString()}</div>
								</div>
								<div className="feedback__text" dangerouslySetInnerHTML={{__html: text.replace(/\\n/g, '<br>')}} />
							</div>
						)
					}
				})}
			</div>
			<div className="feedback-nav">
				<div className="feedback-nav__back">
					<a href={ROUTE_LINKS.feedbackIndex}>← Назад</a>
				</div>
				<div className="feedback-nav__next">
					<a href={ROUTE_LINKS.feedbackDetail({ idcode: nextFeed.id.toString() })}>→ {nextFeed.name}</a>
				</div>
			</div>
		</Fragment>
	)
}
