import { FunctionComponent } from 'preact'
import { NewNokiaTagGroupType, NewTagType, NokiaTagType } from 'types'

import cs from 'classnames'

import { useEmptyDataState } from 'hook/use-empty-data-state'
import { useLoadingState } from 'hook/use-loading-state'
import useApi from 'hook/use-api'

import { Loading } from 'components/ui/loading'

import { NotFoundPage } from 'pages/not-found-page'

import { API_ROUTE } from 'dic/api-route'

import './style.css'

type NokiaTagsGalleryPropsType = {
	filter: NokiaTagType['id']
	updateFilter: (tag: NokiaTagType["id"]) => void
}
export const NokiaTagsGallery: FunctionComponent<NokiaTagsGalleryPropsType> = (props) => {
	// TODO: как проверять, что есть теги без группы?
	// Надо, нврн, загружать группы, но чтобы внутри уже были теги, зачем эта ебля?
	const [tags] = useApi<NewTagType>(API_ROUTE.nokiaTags)
	const [tagGroups] = useApi<NewNokiaTagGroupType>(API_ROUTE.nokiaTagGroup)
	const isLoading = useLoadingState([tags.status, tagGroups.status])
	const isEmptyTags = useEmptyDataState(tags.data)
	const isEmptyTagGroups = useEmptyDataState(tagGroups.data)

	if (isLoading) {
		return <Loading />
	}
	if (isEmptyTags || isEmptyTagGroups) {
		return <NotFoundPage />
	}

	return (
		<div className="nokia-tags-gallery">
			{tagGroups.data.map(tagGroup => (
				<div className="nokia-tags-gallery__group">
					<div className="nokia-tags-gallery__group-name">
						{tagGroup}
					</div>
					<div className="nokia-tags-gallery__group-tags">
						{tags.data.filter(i => i.group === tagGroup).map(item => (
							<div
								className={cs('tag__item', { 'tag__item--active': item.id === props.filter})}
								onClick={() => props.updateFilter(item.id)}
							>
								{item.name}
							</div>
						))}
					</div>
				</div>
			))}
		</div>
	)
}
