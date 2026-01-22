import { FunctionComponent } from 'preact'
import { AccordType } from 'types'

import { usePageTitle } from 'hook/use-page-title'

/**
 * Показывает аккорды песни и устанавливается title
 */
export const AccordContent: FunctionComponent<{ song: AccordType }> = ({ song }) => {
	usePageTitle(song.name)
	
	return <pre>{song.text}</pre>
}