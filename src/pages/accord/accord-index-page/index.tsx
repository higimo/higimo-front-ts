import { FunctionComponent } from 'preact'

import { useAccord } from 'hook/use-accord'
import { useFilterByTags } from 'hook/tags/use-filter-by-tags'
import { usePageTitle } from 'hook/browser/use-page-title'
import { useSmartTags } from 'hook/tags/use-smart-tags'

import { AccordElement } from 'components/accord/accord-element'
import { AccordTagGallery } from 'components/accord/accord-baidge-gallery'
import { TextContainer } from 'components/ui/text-container'

import { ACCORD_TAG_CATEGORY } from 'data/accord/tags-category'

import './style.css'

export const AccordIndexPage: FunctionComponent = () => {
	usePageTitle('Аккорды')

	const list = useAccord()

	const {
		selectedTagTitles,
		toggleTag,
		isSelected,
	} = useSmartTags({
		categories: ACCORD_TAG_CATEGORY,
		mode: 'single',
	})

	const filtredList = useFilterByTags(list, selectedTagTitles)

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
