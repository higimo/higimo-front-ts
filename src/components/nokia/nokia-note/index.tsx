import { FunctionComponent } from 'preact'
import { NokiaNoteType } from 'types'

type NokiaNotePropsType = {
	note: NokiaNoteType
}
export const NokiaNote: FunctionComponent<NokiaNotePropsType> = ({ note }) => {
	return (
		<div className="person-note"
			dangerouslySetInnerHTML={{ __html: note.text.replace(/\n/g, '<br />')}}
		/>
	)
}
