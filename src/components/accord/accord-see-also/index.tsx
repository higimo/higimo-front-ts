import { FunctionComponent } from 'preact'
import { AccordType } from 'api-types/accord.types'

import { AccordItem } from 'components/accord/accord-item'

type AccordSeeAlsoPropsType = {
	accordList: AccordType[]
}

/**
 * Компонент для See Also секции
 */
export const AccordSeeAlso: FunctionComponent<AccordSeeAlsoPropsType> = ({
	accordList,
}) => (
	<div className="see-also-list">
		{accordList.map(item => (
			<AccordItem
				key={item.id}
				{...item}
				showAlf={false}
				showBaidge={false}
			/>
		))}
	</div>
)
