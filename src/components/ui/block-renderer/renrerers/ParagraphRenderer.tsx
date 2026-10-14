import { FunctionComponent } from 'preact'
import { ParagraphBlock } from 'components/ui/block-renderer/types'

import { BlockRenderer } from 'components/ui/block-renderer/BlockRenderer'

export const ParagraphRenderer: FunctionComponent<ParagraphBlock> = ({
	children
}) => (
	<p>
		{children.map((child, index) => (
			<BlockRenderer key={index} block={child} />
		))}
	</p>
)
