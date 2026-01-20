import { FunctionComponent } from 'preact'

import { useState } from 'preact/hooks'
import { useAccord } from 'components/accord/use-accord'

import { TextContainer } from 'components/ui/text-container'
import { AccordTagGallery } from 'components/accord/accord-baidge-gallery'
import { AccordElement } from 'components/accord/accord-element'

import './style.css'

export const AccordGallery: FunctionComponent = () => {
	const [filter, setFilter] = useState('')
	const list = useAccord(filter)

	const handleFilter = name => () => setFilter(name)

	return (
		<TextContainer className="accord">
			<div>
				<h1>Аккорды</h1>
			</div>
			<AccordTagGallery handleFilter={handleFilter} filter={filter} />
			<div>
				{list.map(item => (
					<AccordElement
						id={item.id}
						name={item.name}
						isMostView={item.isMostView}
						isNew={item.isNew}
						view={item.view}
					/>
				))}
			</div>
		</TextContainer>
	)
}
