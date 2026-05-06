import { Tag } from 'components/ui/tag'
import { TextContainer } from 'components/ui/text-container'
import { TAG_GROUP_ALL_DISABLE, TAG_GROUP_ALL_ENABLE } from 'hook/use-group-tags'
import { FunctionComponent } from 'preact'

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
 * @param param0
 * @returns
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
	// return (
	// 	<div>
	// 		Отношение:{' '}
	// 		<Tag active={!selectedColor.length} onClick={handleColorClick([])}>Сбросить</Tag>{' '}
	// 		<Tag active={selectedColor.length === allColors.length} onClick={handleColorClick(allColors)}>Выбрать всё</Tag>{' '}
	// 		{Object.keys(BAR_COLOR_MAPPING).map(colorName => (
	// 			<Tag active={selectedColor.includes(colorName)} onClick={handleColorClick([colorName])}>{colorName}</Tag>
	// 		))}
	// 		<hr />
	// 		Теги:{' '}
	// 		<Tag active={!selectedTags.length} onClick={handleTagsClick([])}>Сбросить</Tag>{' '}
	// 		<Tag active={selectedTags.length === allTags.length} onClick={handleTagsClick(allTags)}>Выбрать всё</Tag>{' '}
	// 		{Object.keys(barTagsCategory).map(item => (
	// 			<div>
	// 				{item}{' '}
	// 				{Object.keys(barTagsCategory[item]).map(subitem => (
	// 					<Tag active={selectedTags.includes(subitem)} onClick={handleTagsClick([subitem])}>{subitem}</Tag>
	// 				))}
	// 			</div>
	// 		))}
	// 	</div>
	// )
}
