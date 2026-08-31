import { FunctionComponent } from 'preact'
import { InlineSpanBlock } from 'pages/resume/components/block-renderer/types'

export const InlineSpanRenderer: FunctionComponent<InlineSpanBlock> = ({ className, value }) => (
	<span className={className || ''}>{value}</span>
)
