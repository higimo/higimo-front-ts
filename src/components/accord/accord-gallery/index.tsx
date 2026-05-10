import { FunctionComponent } from 'preact'

import { useCallback, useState } from 'preact/hooks'
import { useAccord } from 'components/accord/use-accord'

import { TextContainer } from 'components/ui/text-container'
import { AccordTagGallery } from 'components/accord/accord-baidge-gallery'
import { AccordElement } from 'components/accord/accord-element'

import './style.css'

export const AccordGallery: FunctionComponent = () => {
	const [filter, setFilter] = useState('')
	const list = useAccord(filter)

	// TODO: [USE_TAGS] использовать useTag
	const handleFilter = useCallback((tagName: string) => () => setFilter(tagName), [setFilter])

	return (
		<TextContainer className="accord">
			<h1>Аккорды</h1>
			<AccordTagGallery handleFilter={handleFilter} filter={filter} />
			<div>
				{list.map(item => (
					<AccordElement key={item.id} {...item} />
				))}
			</div>
		</TextContainer>
	)
}
