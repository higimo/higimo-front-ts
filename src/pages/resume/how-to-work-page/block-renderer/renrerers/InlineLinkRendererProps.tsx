import { FunctionComponent } from 'preact'

type InlineLinkRendererPropsType = {
	href: string
	text: string
}

export const InlineLinkRenderer: FunctionComponent<InlineLinkRendererPropsType> = ({
	href,
	text,
}) => (
	<a href={href}>{text}</a>
)
