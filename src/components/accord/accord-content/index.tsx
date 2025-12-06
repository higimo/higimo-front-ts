import { FunctionComponent } from "preact"
import { useEffect } from "preact/hooks"
import { AccordType } from "types"

/**
 * Компонент для отображения содержимого аккорда
 */
export const AccordContent: FunctionComponent<{ song: AccordType }> = ({ song }) => {
	useEffect(() => {
		document.title = song.name
	}, [song.name])
	
	return <pre>{song.text}</pre>
}