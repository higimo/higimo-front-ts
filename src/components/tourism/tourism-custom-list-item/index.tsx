import { FunctionComponent } from 'preact'

import { useRoute } from 'preact-iso'

import { MaybeLink } from 'components/ui/maybe-link'

import { compareRoute } from 'utils/url-route/compare-route'

type TourismCustomListItemPropsType = {
	href: string
	bullit: string
	value: string
}

export const TourismCustomListItem: FunctionComponent<TourismCustomListItemPropsType> = ({
	href,
	bullit,
	value,
}) => {
	const { path } = useRoute()

	return (
		<MaybeLink
			className="tourism-custom-list__item"
			href={href}
			isHref={!compareRoute(href, path)}
		>
			<div className="tourism-custom-list__bullet">
				{bullit}
			</div>
			<div className="tourism-custom-list__value">
				{value}
			</div>
		</MaybeLink>
	)
}
