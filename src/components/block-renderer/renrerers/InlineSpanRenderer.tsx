import { FunctionComponent } from 'preact'

import { SpanInlineBlock } from 'components/block-renderer/types'

import { replaceRenderBlockVariables } from 'utils/replace-render-block-variables'

import { variablesRenderBlockSignal } from 'components/stores/render-block-variables-store'

export const InlineSpanRenderer: FunctionComponent<SpanInlineBlock> = ({ className, value }) => (
	<span className={className || ''}>
		{replaceRenderBlockVariables(value, variablesRenderBlockSignal.value)}
	</span>
)
