import { FunctionComponent } from 'preact'

import { replaceRenderBlockVariables } from 'utils/replace-render-block-variables'

import { variablesRenderBlockSignal } from 'components/stores/render-block-variables-store'

type InlineLinkRendererPropsType = {
	href: string
	text: string
}

export const InlineLinkRenderer: FunctionComponent<InlineLinkRendererPropsType> = ({
	href,
	text,
}) => (
	<a href={href}>
		{replaceRenderBlockVariables(text, variablesRenderBlockSignal.value)}
	</a>
)
