import { FunctionComponent } from 'preact'

import { Tag } from 'components/ui/tag'
import { TextContainer } from 'components/ui/text-container'

import { TAG_GROUP_ALL_DISABLE, TAG_GROUP_ALL_ENABLE } from 'hook/use-group-tags'

import './style.css'

// TODO: [MEDIUM] очень похоже на ProjectTagGroupGallery
type TagGroupedGalleryProps = {
	groups: Record<string, string[]> // {Главные: [ALS, Rtop], размер: [большой, малый]}
	selectedTags: Record<string, Set<string>>
	toggleTag: (group: string, tag: string) => void
	selectAll: (group: string) => void
	deselectAll: (group: string) => void
	isAllSelected: (group: string) => boolean
	isNoneSelected: (group: string) => boolean
}
/**
 * Кэшировать groups надо на уровне выше в useMemo
 * Теги должны быть строго в tags, даже если есть соседнее поле, дублирующее эту информацию
 */
export const TagGroupedGallery: FunctionComponent<TagGroupedGalleryProps> = ({
	groups,
	selectedTags,
	toggleTag,
	selectAll,
	deselectAll,
	isAllSelected,
	isNoneSelected,
}) => {
	return (
		<TextContainer className="tag-tree">
			{Object.entries(groups).map(([groupName, tags]) => {
				const hasAllDisable = tags.includes(TAG_GROUP_ALL_DISABLE)
        		const hasAllEnable = tags.includes(TAG_GROUP_ALL_ENABLE)
        		const realTags = tags.filter(t => t !== TAG_GROUP_ALL_DISABLE && t !== TAG_GROUP_ALL_ENABLE)

				return (
					<div className="tag-tree__category" key={groupName}>
						<div className="tag-tree__name">
							{groupName}
						</div>
						<div className="tag-tree__tags">
							{hasAllEnable && (
								<Tag
									active={isAllSelected(groupName)}
									onClick={() => selectAll(groupName)}
								>
									Выбрать всё
								</Tag>
							)}
							{hasAllDisable && (
								<Tag
									active={isNoneSelected(groupName)}
									onClick={() => deselectAll(groupName)}
								>
									Сбросить
								</Tag>
							)}
							{realTags.map(tagName => {
								return (
									<Tag
										key={tagName}
										active={selectedTags[groupName]?.has(tagName) ?? false}
										onClick={() => toggleTag(groupName, tagName)}
									>
										{tagName}
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
