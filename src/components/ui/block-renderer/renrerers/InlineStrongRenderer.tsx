import { FunctionComponent } from 'preact'
import { StrongInlineBlock } from 'components/ui/block-renderer/types'

import { replaceRenderBlockVariables } from 'utils/replace-render-block-variables'

import { variablesRenderBlockSignal } from 'context/render-block-variables-signal'

export const InlineStrongRenderer: FunctionComponent<StrongInlineBlock> = ({
	value,
}) => (
	<strong>{replaceRenderBlockVariables(value, variablesRenderBlockSignal.value)}</strong>
)
