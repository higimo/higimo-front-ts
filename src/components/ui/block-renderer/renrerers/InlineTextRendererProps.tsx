import { FunctionComponent } from 'preact'

import { replaceRenderBlockVariables } from 'utils/replace-render-block-variables'

import { variablesRenderBlockSignal } from 'context/render-block-variables-signal'

type InlineTextRendererPropsType = {
	value: string
}

export const InlineTextRenderer: FunctionComponent<InlineTextRendererPropsType> = ({
	value,
}) => (
	<>{replaceRenderBlockVariables(value, variablesRenderBlockSignal.value)}</>
)
