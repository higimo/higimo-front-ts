import { ExperienceListBlock } from 'components/ui/block-renderer/types'
import { FunctionComponent } from 'preact'

import { ExperienceItemRenderer } from 'components/ui/block-renderer/renrerers/ExperienceItemRenderer'

export const ExperienceListRenderer: FunctionComponent<ExperienceListBlock> = ({
	items,
}) => (
	<div className="expirience">
		{items.map((item, key) => (
			<ExperienceItemRenderer key={key} {...item} />
		))}
	</div>
)
