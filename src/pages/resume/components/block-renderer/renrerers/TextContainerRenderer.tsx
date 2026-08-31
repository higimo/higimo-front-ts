import { FunctionComponent } from 'preact'
import { TextContainerBlock } from 'pages/resume/components/block-renderer/types'

import { TextContainer } from 'components/ui/text-container'
import { BlockRenderer } from 'pages/resume/components/block-renderer/BlockRenderer'

export const TextContainerRenderer: FunctionComponent<TextContainerBlock> = ({ children }) => (
	<TextContainer>
		{children.map((child, idx) => (
			<BlockRenderer key={idx} block={child} />
		))}
	</TextContainer>
)
