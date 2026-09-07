import { FunctionComponent } from 'preact'
import { InlineBlock } from 'components/block-renderer/types'

import { BlockRenderer } from 'components/block-renderer/BlockRenderer'

type ParagraphRendererPropsType = {
	children: InlineBlock[]
}

export const ParagraphRenderer: FunctionComponent<ParagraphRendererPropsType> = ({
	children
}) => (
	<p>
		{children.map((child, index) => (
			<BlockRenderer key={index} block={child} />
		))}
	</p>
)
