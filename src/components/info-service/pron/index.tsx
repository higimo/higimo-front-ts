import { FunctionComponent } from 'preact'
import { PronType } from 'api-types/pron.types'

import './style.css'

type PronListPropsType = {
	pronList: PronType[]
}

export const PronList: FunctionComponent<PronListPropsType> = ({ pronList }) => (
	<div className="gallery-pron container">
		<button
			className="gallery-pron__btn"
			onClick={() => {pronList.forEach(i => window.open(`https://rt.pornhub.com/view_video.php?viewkey=${i.code}`))}}
		>
			Открыть порцию
		</button>
	</div>
)
