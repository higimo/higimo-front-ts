import { Fragment, FunctionComponent } from 'preact'
import { AccordType } from 'api-types/accord.types'

import { usePageTitle } from 'hook/use-page-title'

/**
 * Показывает аккорды песни и устанавливается title
 */
export const AccordContent: FunctionComponent<{ song: AccordType }> = ({ song }) => {
	usePageTitle(song.name)

	return (
		<Fragment>
			<div className="accord-title">
				<strong>{song.name}</strong>
			</div>
			<pre>{song.text}</pre>
		</Fragment>
	)
}
