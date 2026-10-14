import { CollapsibleBlock } from 'components/ui/block-renderer/types'
import { FunctionComponent } from 'preact'

import { BlockRenderer } from 'components/ui/block-renderer/BlockRenderer'
import { CollapseSection } from 'components/ui/collapse-section'

export const CollapsibleRenderer: FunctionComponent<CollapsibleBlock> = ({
	header,
	children,
	defaultOpen = true
}) => (
	<CollapseSection title={<h3>{header}</h3>} fold={!defaultOpen}>
		{children.map((child, idx) => (
			<BlockRenderer key={idx} block={child} />
		))}
	</CollapseSection>
)
