import { FunctionComponent } from 'preact'
import { AnyBlock } from 'pages/resume/components/block-renderer/types'

import { PrecentationContainer } from 'components/ui/precentation-container'
import { TextContainer } from 'components/ui/text-container'
import { BlockRenderer } from 'pages/resume/components/block-renderer/BlockRenderer'

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
