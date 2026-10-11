import { FunctionComponent } from 'preact'
import { NokiaNoteType } from 'api-types/nokia.types'

import { getBr } from 'utils/text/get-br'

type NokiaNotePropsType = {
	note: NokiaNoteType
}

export const NokiaNote: FunctionComponent<NokiaNotePropsType> = ({ note }) => (
	<div className="person-note"
		dangerouslySetInnerHTML={{ __html: getBr(note.text)}}
	/>
)
