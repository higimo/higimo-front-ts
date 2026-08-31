import { FunctionComponent } from 'preact'
import { ExperienceListBlock } from 'pages/resume/components/block-renderer/types'

import { ExperienceItemRenderer } from 'pages/resume/components/block-renderer/renrerers/ExperienceItemRenderer'

export const ExperienceListRenderer: FunctionComponent<ExperienceListBlock> = ({
	items,
}) => (
	<div className="expirience">
		{items.map((item, idx) => (
			<ExperienceItemRenderer key={idx} {...item} />
		))}
	</div>
)
