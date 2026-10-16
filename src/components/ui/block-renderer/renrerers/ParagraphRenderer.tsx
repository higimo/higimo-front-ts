import { FunctionComponent } from 'preact'
import { ParagraphBlock } from 'components/ui/block-renderer/types'

import { BlockRenderer } from 'components/ui/block-renderer/BlockRenderer'

export const ParagraphRenderer: FunctionComponent<ParagraphBlock> = ({
	children
}) => (
	<p>
		{children.map((child, key) => (
			<BlockRenderer key={key} block={child} />
		))}
	</p>
)
