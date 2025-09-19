import { FunctionComponent } from 'preact'

import { useState } from 'preact/hooks'

import { TextContainer } from 'components/ui/text-container'

import './style.css'
import { useAccord } from '../use-accord'
import { AccordTagGallery } from '../accord-baidge-gallery'
import { AccordElement } from '../accord-element'

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
