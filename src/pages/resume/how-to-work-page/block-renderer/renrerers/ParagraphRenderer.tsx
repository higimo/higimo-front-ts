import { FunctionComponent } from 'preact'
import { InlineBlock } from 'pages/resume/how-to-work-page/block-renderer/types'

import { BlockRenderer } from 'pages/resume/how-to-work-page/block-renderer/BlockRenderer'

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
