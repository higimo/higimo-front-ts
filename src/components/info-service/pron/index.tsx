import { FunctionComponent } from 'preact'
import { PronType } from 'api-types/pron.types'

import './style.css'

type PronIndexPropsType = {
	prons: PronType[]
}
export const PronIndex: FunctionComponent<PronIndexPropsType> = ({ prons }) => {
	return (
		<div className="gallery-pron container">
			<button
				className="gallery-pron__btn"
				onClick={() => {prons.forEach(i => window.open(`https://rt.pornhub.com/view_video.php?viewkey=${i.code}`))}}
			>
				Открыть порцию
			</button>
		</div>
	)
}
