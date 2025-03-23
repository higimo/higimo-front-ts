import { FunctionComponent } from 'preact'

import { useState } from 'preact/hooks'
import { useAccord } from '../use-accord'

import { TextContainer } from '../../ui/text-container'

import { AccordElement } from '../accord-element'
import { AccordBaidgeGallery } from '../accord-baidge-gallery'

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
			<AccordBaidgeGallery handleFilter={handleFilter} filter={filter} />
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
