import { FunctionComponent } from 'preact'
import { NokiaNoteType } from 'api-types/nokia.types'

type NokiaNotePropsType = {
	note: NokiaNoteType
}
export const NokiaNote: FunctionComponent<NokiaNotePropsType> = ({ note }) => (
	<div className="person-note"
		dangerouslySetInnerHTML={{ __html: note.text.replace(/\n/g, '<br />')}}
	/>
)
