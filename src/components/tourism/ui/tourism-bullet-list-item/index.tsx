import { ClassNameType } from 'utils.type'
import { FunctionComponent } from 'preact'

import cs from 'classnames'

type TourismBulletListItemPropsType = ClassNameType & {
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
