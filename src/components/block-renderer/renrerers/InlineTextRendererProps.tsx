import { FunctionComponent } from 'preact'

import { replaceRenderBlockVariables } from 'utils/replace-render-block-variables'

import { variablesRenderBlockSignal } from 'components/stores/render-block-variables-store'

type InlineTextRendererPropsType = {
	value: string
}

export const InlineTextRenderer: FunctionComponent<InlineTextRendererPropsType> = ({
	value,
}) => (
	<>{replaceRenderBlockVariables(value, variablesRenderBlockSignal.value)}</>
)
