import { Fragment, FunctionComponent } from 'preact'
import { FeedbackElement, FeedbackType } from 'types'

import { useRoute } from 'preact-iso'
import useApi from 'hook/use-api'
import { useLoadingState } from 'hook/use-loading-state'
import { useEmptyDataState } from 'hook/use-empty-data-state'

import { Loading } from 'components/ui/loading'
import { NotFoundData } from 'components/ui/not-found-data'

import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'
import { API_ROUTE } from 'dic/api-route'

import './style.css'

type GetBasenameType = (string) => string
const getBasename: GetBasenameType = (str) => (str + '').substring(str.lastIndexOf('/') + 1)

type GetRandomElementFromArrayType = <T>(arr: T[]) => T | null
const getRandomElementFromArray: GetRandomElementFromArrayType = (arr) => (arr.length < 1) ? null : arr[Math.floor(Math.random() * (arr.length + 1))]

export const FeedbackItem: FunctionComponent = () => {
	const { params: { idcode = '' }} = useRoute()
	const [ blockElementList ] = useApi<FeedbackElement>(API_ROUTE.feedbackBlock({ idcode }))
	const [ feedbackList ] = useApi<FeedbackType>(API_ROUTE.feedback)
	const isLoading = useLoadingState([blockElementList.status, feedbackList.status])
	const isBlockElementListEmpty = useEmptyDataState(blockElementList.data)
	const isFeedbackListEmpty = useEmptyDataState(blockElementList.data)
	
	if (isLoading) {
		return <Loading />
	}

	if (isBlockElementListEmpty || isFeedbackListEmpty || !idcode.length) {
		return <NotFoundData />
	}

	// window.scrollTo({ top: 0, behavior: 'smooth' })

	const nextFeed = getRandomElementFromArray<FeedbackType>(feedbackList.data)

	return (
		<Fragment>
			<div className="feed">
				{blockElementList.data.map(({ create_at, name, theme, text, image, file }) => {
					if (theme) {
						// TODO usePageTitle
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
