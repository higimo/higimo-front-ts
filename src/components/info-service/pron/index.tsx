import { FunctionComponent } from 'preact'
import { PronType } from 'api-types/pron.types'

import './style.css'

type PronIndexPropsType = {
	pronList: PronType[] | null
}

export const PronIndex: FunctionComponent<PronIndexPropsType> = ({ pronList }) => pronList && (
	<div className="gallery-pron container">
		<button
			className="gallery-pron__btn"
			onClick={() => {pronList.forEach(i => window.open(`https://rt.pornhub.com/view_video.php?viewkey=${i.code}`))}}
		>
			Открыть порцию
		</button>
	</div>
)
