import { FunctionComponent } from 'preact'
import { TextContainerBlock } from 'components/ui/block-renderer/types'

import { BlockRenderer } from 'components/ui/block-renderer/BlockRenderer'
import { TextContainer } from 'components/ui/text-container'

export const TextContainerRenderer: FunctionComponent<TextContainerBlock> = ({ children }) => (
	<TextContainer>
		{children.map((child, key) => (
			<BlockRenderer key={key} block={child} />
		))}
	</TextContainer>
)
