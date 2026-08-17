import cs from 'classnames'

import { FunctionComponent } from 'preact'

type TourismBulletListItemPropsType = {
	className?: string
	href: string
	title: string
}

export const TourismBulletListItem: FunctionComponent<TourismBulletListItemPropsType> = ({
	className, href, title,
}) => (
	<div className={cs('tourism-bullet-list__item', className)}>
		<a
			href={href}
			className="tourism-bullet-list__link"
		>
			{title}
		</a>
	</div>
)
