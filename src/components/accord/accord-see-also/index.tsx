import { FunctionComponent } from 'preact'
import { AccordRealTagType, AccordType } from 'api-types/accord.types'

import { AccordElement } from 'components/accord/accord-element'

/**
 * Компонент для See Also секции
 */
export const AccordSeeAlso: FunctionComponent<{ items: AccordType[] }> = ({ items }) => (
	<div className="see-also-list">
		{items.map(item => (
			<AccordElement
				key={item.id}
				{...item as AccordRealTagType}
				showAlf={false}
				showBaidge={false}
			/>
		))}
	</div>
)
