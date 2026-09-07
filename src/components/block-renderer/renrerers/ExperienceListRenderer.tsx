import { FunctionComponent } from 'preact'
import { ExperienceListBlock } from 'components/block-renderer/types'

import { ExperienceItemRenderer } from 'components/block-renderer/renrerers/ExperienceItemRenderer'

export const ExperienceListRenderer: FunctionComponent<ExperienceListBlock> = ({
	items,
}) => (
	<div className="expirience">
		{items.map((item, idx) => (
			<ExperienceItemRenderer key={idx} {...item} />
		))}
	</div>
)
