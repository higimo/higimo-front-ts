import { ComponentChildren, FunctionComponent } from 'preact'

import cs from 'classnames'

import './style.css'

type GridTailPropsType = {
	title: ComponentChildren
	href: string
	isArhive?: boolean
	description: string
}

export const GridTail: FunctionComponent<GridTailPropsType> = ({
	href,
	title,
	isArhive,
	description,
}) => {
	return (
		<a
			className={cs(
				'grid-tile',
				{ 'grid-tile--archive': isArhive }
			)}
			href={href}
		>
			<div className="grid-tile__title">
				{title}
			</div>
			<div
				className="grid-tile__description"
				dangerouslySetInnerHTML={{ __html: description }} />
		</a>
	)
}
