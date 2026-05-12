import { FunctionComponent } from 'preact'
import { TagCategory } from 'hook/tags/use-smart-tags'

import { Tag } from 'components/ui/tag'
import { TextContainer } from 'components/ui/text-container'

import { TAG_GROUP_ALL_DISABLE, TAG_GROUP_ALL_ENABLE } from 'hook/use-group-tags'

import './style.css'

type TagGroupedGalleryProps = {
	groups: TagCategory[]
	isSelected: (tagName: string) => boolean
	toggleTag: (tagName: string) => () => void
	isCategoryAllSelected: (categoryTitle: string) => boolean
	toggleAllInCategory: (categoryTitle: string) => () => void
}

/**
 * Кэшировать groups надо на уровне выше в useMemo
 * Теги должны быть строго в tags, даже если есть соседнее поле, дублирующее эту информацию
 */
export const TagGroupedGallery: FunctionComponent<TagGroupedGalleryProps> = ({
	groups,
	isSelected,
	toggleTag,
	isCategoryAllSelected,
	toggleAllInCategory,
}) => {
	return (
		<TextContainer className="tag-tree">
			{groups.map(({ group, tags }) => {
				// const hasAllDisable = tags.includes(TAG_GROUP_ALL_DISABLE)
        		// const hasAllEnable = tags.includes(TAG_GROUP_ALL_ENABLE)
        		// const realTags = tags.filter(t => t !== TAG_GROUP_ALL_DISABLE && t !== TAG_GROUP_ALL_ENABLE)

				return (
					<div className="tag-tree__category" key={group.title}>
						<div className="tag-tree__name">
							{group.title}
							{'   '}
							<Tag active={isCategoryAllSelected(group.title)} onClick={toggleAllInCategory(group.title)}>
								{isCategoryAllSelected(group.title) ? 'Откл. все' : 'Вкл. все'}
							</Tag>
						</div>
						<div className="tag-tree__tags">
							{tags.map(tag => {
								return (
									<Tag
										key={tag.id}
										active={isSelected(tag.title)}
										onClick={toggleTag(tag.title)}
									>
										{tag.title}
									</Tag>
								)
							})}
						</div>
					</div>
				)
			})}
		</TextContainer>
	)
}
