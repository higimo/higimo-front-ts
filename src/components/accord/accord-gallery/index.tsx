import { FunctionComponent } from 'preact'

import { useAccord } from 'components/accord/use-accord'
import { useFilterByTags } from 'hook/tags/use-filter-by-tags'
import { useSmartTags } from 'hook/tags/use-smart-tags'

import { AccordTagGallery } from 'components/accord/accord-baidge-gallery'
import { AccordElement } from 'components/accord/accord-element'
import { TextContainer } from 'components/ui/text-container'

import { ACCORD_TAG_CATEGORY } from 'components/accord/tags'

import './style.css'

export const AccordGallery: FunctionComponent = () => {
	const list = useAccord()

	const {
		selectedIds,
		toggleTag,
		isSelected,
	} = useSmartTags({
		categories: ACCORD_TAG_CATEGORY,
		mode: 'single',
	})

	const filtredList = useFilterByTags(list, selectedIds)

	return (
		<TextContainer className="accord">
			<h1>Аккорды</h1>
			<AccordTagGallery
				toggleTag={toggleTag}
				isSelected={isSelected}
			/>
			<div>
				{filtredList.map(item => (
					<AccordElement key={item.id} {...item} />
				))}
			</div>
		</TextContainer>
	)
}
