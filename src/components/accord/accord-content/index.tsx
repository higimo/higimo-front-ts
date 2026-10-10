import { AccordType } from 'api-types/accord.types'
import { Fragment, FunctionComponent } from 'preact'

// TODO: [ONE_CLASS_COMPONENT] прям отдельный компонент нужен? Мб, сделать общий с className

type AccordContentPropsType = {
	accordItem: AccordType | null
}

/**
 * Показывает аккорды песни и устанавливается title
 */
export const AccordContent: FunctionComponent<AccordContentPropsType> = ({
	accordItem
}) => accordItem && (
	<Fragment>
		<div className="accord-title">
			<strong>{accordItem.name}</strong>
		</div>
		<pre>{accordItem.text}</pre>
	</Fragment>
)
