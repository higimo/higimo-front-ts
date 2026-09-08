import { AccordType } from 'api-types/accord.types'
import { Fragment, FunctionComponent } from 'preact'

/**
 * Показывает аккорды песни и устанавливается title
 */
export const AccordContent: FunctionComponent<{ song: AccordType }> = ({ song }) => (
	<Fragment>
		<div className="accord-title">
			<strong>{song.name}</strong>
		</div>
		<pre>{song.text}</pre>
	</Fragment>
)
