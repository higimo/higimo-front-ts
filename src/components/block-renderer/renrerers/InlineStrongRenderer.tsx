import { FunctionComponent } from 'preact'

import { replaceRenderBlockVariables } from 'utils/replace-render-block-variables'

import { variablesRenderBlockSignal } from 'context/render-block-variables-store'

type InlineStrongRendererPropsType = {
	value: string
}

export const InlineStrongRenderer: FunctionComponent<InlineStrongRendererPropsType> = ({
	value,
}) => (
	<strong>{replaceRenderBlockVariables(value, variablesRenderBlockSignal.value)}</strong>
)
