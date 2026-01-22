import { Fragment, FunctionComponent } from 'preact'
import { FeedbackElement, FeedbackPageType } from 'types'

import { useRoute } from 'preact-iso'
import useApi from 'hook/use-api'
import { useLoadingState } from 'hook/use-loading-state'
import { useEmptyDataState } from 'hook/use-empty-data-state'
import { usePageTitle } from 'hook/use-page-title'

import { Loading } from 'components/ui/loading'
import { NotFoundData } from 'components/ui/not-found-data'

import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'
import { API_ROUTE } from 'dic/api-route'

import './style.css'
import { getDate } from 'utils/get-date'

type GetBasenameType = (string) => string
const getBasename: GetBasenameType = (str) => (str + '').substring(str.lastIndexOf('/') + 1)

export const FeedbackItem: FunctionComponent = () => {
	const { params: { idcode = '' }} = useRoute()

	const [ blockElementList ] = useApi<FeedbackElement>(API_ROUTE.feedbackBlock({ idcode }))
	const isLoading = useLoadingState([blockElementList.status])
	const isBlockElementListEmpty = useEmptyDataState(blockElementList.data)
	const isFeedbackListEmpty = useEmptyDataState(blockElementList.data)

	const currentPage = blockElementList.data as unknown as FeedbackElement // TODO fix useApi
	
	usePageTitle([currentPage?.title, 'higimo Багрепорты'].filter(Boolean).join(' | '))

	if (isLoading) {
		return <Loading />
	}
	
	if (isBlockElementListEmpty || isFeedbackListEmpty || !idcode.length) {
		return <NotFoundData />
	}

	return (
		<Fragment>
			<div className="feed">
				<h1>{currentPage.title}</h1>
				{/* TODO: пофиксить даты в БД */}
				<p>{new Date(currentPage.created_at).toLocaleString()}</p>
				{currentPage.blocks.map(({ created_at, name, theme, text, image, file }) => {
					// TODO убрать theme из базы, это больше не нужно
					if (theme) {
						return null
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
									<div className="feedback__date">{new Date(parseInt(created_at, 10)).toLocaleString()}</div>
								</div>
								<div className="feedback__text" dangerouslySetInnerHTML={{__html: text.replace(/\\n/g, '<br>')}} />
							</div>
						)
					}
				})}
			</div>
			<div className="feedback-nav">
				<div className="feedback-nav__home">
					<a href={ROUTE_LINKS.feedbackIndex}>↑ В начало</a>
				</div>
				<div className="feedback-nav__next">
					<a href={ROUTE_LINKS.feedbackDetail({ idcode: currentPage.navigation.prev.id.toString() })}>← {currentPage.navigation.prev.title}</a>
				</div>
				<div className="feedback-nav__next">
					<a href={ROUTE_LINKS.feedbackDetail({ idcode: currentPage.navigation.next.id.toString() })}>→ {currentPage.navigation.next.title}</a>
				</div>
			</div>
		</Fragment>
	)
}
