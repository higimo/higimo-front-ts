import { ComponentChildren, FunctionComponent } from 'preact'

import cs from 'classnames'

import { MaybeLink } from 'components/ui/maybe-link'

import './style.css'

type TileElementPropsType = {
	isInactive?: boolean
	className: string
	href: string
	image?: ComponentChildren
	name: ComponentChildren
	description: string
}
export const TileElement: FunctionComponent<TileElementPropsType> = props => (
	<MaybeLink
		className={cs(
			'tile-element',
			{ 'tile-element--inactive': props.isInactive },
			props.className
		)}
		href={props.href}
	>
		{!!props.image && (
			<div className="tile-element__image-container">{props.image}</div>
		)}
		<div className="tile-element__anons">
			<div className="tile-element__name">
				<span className="tile-element__name-inner">{props.name}</span>
			</div>
			<div className="tile-element__preview">
				<span
					className="tile-element__description"
					dangerouslySetInnerHTML={{ __html: props.description }}
				/>
			</div>
			{props.children}
		</div>
	</MaybeLink>
)
