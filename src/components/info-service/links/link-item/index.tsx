import { FunctionComponent } from 'preact'

import './style.css'

type LinkItemPropsType = {
	href: string
	name: string
}
export const LinkItem: FunctionComponent<LinkItemPropsType> = ({ href, name }) => (
	<div className="container link-gallery">
		<div className="link-gallery__item">
			<a className="link-gallery__link" href={href}>{name}</a>
		</div>
	</div>
)
