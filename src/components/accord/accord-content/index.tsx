import { FunctionComponent } from 'preact'
import { AccordType } from 'types'

import { usePageTitle } from 'hook/use-page-title'


/**
 * Компонент для отображения содержимого аккорда
 */
export const AccordContent: FunctionComponent<{ song: AccordType }> = ({ song }) => {
	usePageTitle(song.name)
	
	return <pre>{song.text}</pre>
}