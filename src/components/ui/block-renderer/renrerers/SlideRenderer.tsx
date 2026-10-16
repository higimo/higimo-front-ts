import { FunctionComponent } from 'preact'
import { SlideBlock } from 'components/ui/block-renderer/types'

import { BlockRenderer } from 'components/ui/block-renderer/BlockRenderer'
import { PrecentationContainer } from 'components/ui/precentation-container'
import { TextContainer } from 'components/ui/text-container'

export const SlideRenderer: FunctionComponent<SlideBlock> = ({
	className,
	children,
}) => (
	<PrecentationContainer className={className}>
		<TextContainer>
			{children.map((child, key) => (
				<BlockRenderer key={key} block={child} />
			))}
		</TextContainer>
	</PrecentationContainer>
)
