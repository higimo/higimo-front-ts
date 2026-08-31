import { FunctionComponent } from 'preact'

type InlineTextRendererPropsType = {
	value: string
}

export const InlineTextRenderer: FunctionComponent<InlineTextRendererPropsType> = ({
	value,
}) => (
	<>{value}</>
)
