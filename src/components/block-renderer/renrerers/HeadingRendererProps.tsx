import { FunctionComponent, h } from 'preact'

import { replaceRenderBlockVariables } from 'utils/replace-render-block-variables'

import { variablesRenderBlockSignal } from 'components/stores/render-block-variables-store'

type HeadingRendererPropsType = {
	level: 1 | 2 | 3 | 4 | 5 | 6
	text: string
}

export const HeadingRenderer: FunctionComponent<HeadingRendererPropsType> = ({
	level,
	text,
}) => {
	const Tag = `h${level}`

	return h(
		Tag,
		null,
		replaceRenderBlockVariables(text, variablesRenderBlockSignal.value)
	)
}
