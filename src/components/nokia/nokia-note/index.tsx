import { FunctionComponent } from 'preact'
import { NewNokiaNoteType } from 'types'

type NokiaNotePropsType = {
	note: NewNokiaNoteType
}
export const NokiaNote: FunctionComponent<NokiaNotePropsType> = ({ note }) => {
	return (
		<div className="person-note"
			dangerouslySetInnerHTML={{ __html: note.text.replace(/\n/g, '<br />')}}
		/>
	)
}
