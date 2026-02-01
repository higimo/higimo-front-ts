import { FunctionComponent } from 'preact'
import { NokiaTagType } from 'types'
import { NokiaContext, NokiaContextType } from 'context/nokia'

import { useContext } from 'preact/hooks'

import cs from 'classnames'

import './style.css'

type NokiaTagsGalleryPropsType = {
	filter: NokiaTagType['id']
	updateFilter: (tag: NokiaTagType["id"]) => void
}
export const NokiaTagsGallery: FunctionComponent<NokiaTagsGalleryPropsType> = (props) => {
	// TODO: как проверять, что есть теги без группы?
	// Надо, нврн, загружать группы, но чтобы внутри уже были теги, зачем эта ебля?
	const { tags, tagGroups } = useContext<NokiaContextType>(NokiaContext)

	return (
		<div className="nokia-tags-gallery">
			{tagGroups.map(tagGroup => (
				<div className="nokia-tags-gallery__group">
					<div className="nokia-tags-gallery__group-name">
						{tagGroup}
					</div>
					<div className="nokia-tags-gallery__group-tags">
						{tags.filter(i => i.group === tagGroup).map(item => (
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