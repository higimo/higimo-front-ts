import { AccordType } from 'api-types/accord.types'
import { Fragment, FunctionComponent } from 'preact'

type AccordDetailPropsType = {
	accordItem: AccordType | null
}

/**
 * Показывает аккорды песни и устанавливается title
 */
export const AccordDetail: FunctionComponent<AccordDetailPropsType> = ({
	accordItem
}) => accordItem && (
	<Fragment>
		<div className="accord-title">
			<strong>{accordItem.name}</strong>
		</div>
		<pre>{accordItem.text}</pre>
	</Fragment>
)
