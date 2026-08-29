import { FunctionComponent } from 'preact'

type InlineStrongRendererPropsType = {
	value: string
}

export const InlineStrongRenderer: FunctionComponent<InlineStrongRendererPropsType> = ({
	value,
}) => (
	<strong>{value}</strong>
)
