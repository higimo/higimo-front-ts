import { FunctionComponent } from 'preact'
import { AccordType } from 'api-types/accord.types'

import { AccordItem } from 'components/accord/accord-item'

/**
 * Компонент для See Also секции
 */
export const AccordSeeAlso: FunctionComponent<{ items: AccordType[] }> = ({ items }) => (
	<div className="see-also-list">
		{items.map(item => (
			<AccordItem
				key={item.id}
				{...item}
				showAlf={false}
				showBaidge={false}
			/>
		))}
	</div>
)
