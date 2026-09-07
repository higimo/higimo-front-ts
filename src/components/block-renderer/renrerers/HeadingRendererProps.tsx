import { FunctionComponent, h } from 'preact'

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
		text
	)
}
