import { FunctionComponent } from 'preact'

import { NokiaTagGroupType, NokiaTagType } from 'types'

import { useCallback } from 'preact/hooks'
import { useEmptyDataState } from 'hook/use-empty-data-state'
import { useLoadingState } from 'hook/use-loading-state'
import useApi from 'hook/use-api'

import { Loading } from 'components/ui/loading'
import { NokiaTag } from 'components/nokia/nokia-tag'

import { NotFoundPage } from 'pages/not-found-page'

import { API_ROUTE } from 'dic/api-route'

import './style.css'

type NokiaTagsGalleryPropsType = {
	filter: NokiaTagType['id']
	updateFilter: (tag: NokiaTagType["id"]) => void
}
export const NokiaTagsGallery: FunctionComponent<NokiaTagsGalleryPropsType> = ({ filter, updateFilter }) => {
	// TODO: как проверять, что есть теги без группы?
	// Надо, нврн, загружать группы, но чтобы внутри уже были теги, зачем эта ебля?
	const [tags] = useApi<NokiaTagType[]>(API_ROUTE.nokiaTags)
	const [tagGroups] = useApi<NokiaTagGroupType[]>(API_ROUTE.nokiaTagGroup)
	const isLoading = useLoadingState([tags.status, tagGroups.status])
	const isEmptyTags = useEmptyDataState(tags.data)
	const isEmptyTagGroups = useEmptyDataState(tagGroups.data)

	const handleClick = useCallback((tagId: NokiaTagType['id']) => () => updateFilter(tagId), [updateFilter])

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
						{tags.data.filter(i => i.group === tagGroup).map(tag => (
							<NokiaTag
								tag={tag}
								onClick={handleClick(tag.id)}
								isActive={tag.id === filter}
							/>
						))}
					</div>
				</div>
			))}
		</div>
	)
}
