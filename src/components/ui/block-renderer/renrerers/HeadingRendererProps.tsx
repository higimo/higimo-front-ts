import { FunctionComponent, h } from 'preact'
import { HeadingBlock } from 'components/ui/block-renderer/types'

import { replaceRenderBlockVariables } from 'utils/replace-render-block-variables'

import { variablesRenderBlockSignal } from 'context/render-block-variables-signal'

export const HeadingRenderer: FunctionComponent<HeadingBlock> = ({
	level,
	text,
}) => h(
	`h${level}`,
	null,
	replaceRenderBlockVariables(text, variablesRenderBlockSignal.value)
)
