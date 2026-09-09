import { FunctionComponent } from 'preact'
import { SpanInlineBlock } from 'components/block-renderer/types'

export const InlineSpanRenderer: FunctionComponent<SpanInlineBlock> = ({ className, value }) => (
	<span className={className || ''}>{value}</span>
)
