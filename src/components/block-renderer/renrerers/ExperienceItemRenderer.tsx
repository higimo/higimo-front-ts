import { FunctionComponent } from 'preact'
import { ExperienceItemBlock } from 'components/block-renderer/types'

import { BlockRenderer } from 'components/block-renderer/BlockRenderer'

export const ExperienceItemRenderer: FunctionComponent<ExperienceItemBlock> = ({
	profession,
	company,
	companyUrl,
	period,
	duration,
	description
}) => (
	<div className="company">
		<div className="company__meta">
			<div className="company__staff">
				<div className="company__profession">{profession}</div>
				<div className="company__name">
					{companyUrl ? <a href={companyUrl}>{company}</a> : company}
				</div>
			</div>
			<div className="company__timing">
				<div className="company__period">{period}</div>
				{duration && (
					<div className="company__time">({duration})</div>
				)}
			</div>
		</div>
		{description && description.length > 0 && (
			<div className="company__description">
				{description.map((para, idx) => (
					<BlockRenderer key={idx} block={para} />
				))}
			</div>
		)}
	</div>
)
