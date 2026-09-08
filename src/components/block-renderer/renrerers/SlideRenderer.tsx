import { AnyBlock } from 'components/block-renderer/types'
import { FunctionComponent } from 'preact'

import { BlockRenderer } from 'components/block-renderer/BlockRenderer'
import { PrecentationContainer } from 'components/ui/precentation-container'
import { TextContainer } from 'components/ui/text-container'

type SlideRendererPropsType = {
	className?: string
	children: AnyBlock[]
}

export const SlideRenderer: FunctionComponent<SlideRendererPropsType> = ({
	className,
	children,
}) => (
	<PrecentationContainer className={className}>
		<TextContainer>
			{children.map((child, idx) => (
				<BlockRenderer key={idx} block={child} />
			))}
		</TextContainer>
	</PrecentationContainer>
)
