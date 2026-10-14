import { FunctionComponent } from 'preact'
import { LinkInlineBlock } from 'components/ui/block-renderer/types'

import { replaceRenderBlockVariables } from 'utils/replace-render-block-variables'

import { variablesRenderBlockSignal } from 'context/render-block-variables-signal'

export const InlineLinkRenderer: FunctionComponent<LinkInlineBlock> = ({
	href,
	text,
}) => (
	<a href={href}>
		{replaceRenderBlockVariables(text, variablesRenderBlockSignal.value)}
	</a>
)
