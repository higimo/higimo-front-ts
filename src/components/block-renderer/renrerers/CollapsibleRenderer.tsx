import { FunctionComponent } from 'preact'

import { BlockRenderer } from 'components/block-renderer/BlockRenderer'
import { CollapseSection } from 'components/ui/collapse-section'

type CollapsibleRendererPropsType = {
	header: string
	children: any[]
	defaultOpen?: boolean
}

export const CollapsibleRenderer: FunctionComponent<CollapsibleRendererPropsType> = ({
	header,
	children,
	defaultOpen = true
}) => (
	<CollapseSection header={<h3>{header}</h3>} fold={!defaultOpen}>
		{children.map((child, idx) => (
			<BlockRenderer key={idx} block={child} />
		))}
	</CollapseSection>
)
