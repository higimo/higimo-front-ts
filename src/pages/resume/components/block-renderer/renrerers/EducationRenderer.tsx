import { FunctionComponent } from 'preact'
import { EducationBlock } from 'pages/resume/components/block-renderer/types'

export const EducationRenderer: FunctionComponent<EducationBlock> = ({
	status,
	date,
	speciality,
	institution,
}) => (
	<div className="school">
		<div className="school__info">
			<div className="school__status">{status}</div>
			<div className="school__date">{date}</div>
		</div>
		<div className="school__base">
			<div className="school__name">{speciality}</div>
			<div className="school__company">{institution}</div>
		</div>
	</div>
)
