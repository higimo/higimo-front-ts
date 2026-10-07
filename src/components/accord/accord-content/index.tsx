import { AccordType } from 'api-types/accord.types'
import { Fragment, FunctionComponent } from 'preact'

type AccordContentPropsType = {
	// TODO: [LIGHT] переименовать accordItem
	song: AccordType | null
}

/**
 * Показывает аккорды песни и устанавливается title
 */
export const AccordContent: FunctionComponent<AccordContentPropsType> = ({ song }) => song && (
	<Fragment>
		<div className="accord-title">
			<strong>{song.name}</strong>
		</div>
		<pre>{song.text}</pre>
	</Fragment>
)
