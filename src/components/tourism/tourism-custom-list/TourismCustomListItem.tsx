import { FunctionComponent } from 'preact'

type TourismCustomListItemPropsType = {
	href: string
	bullit: string
	value: string
}
export const TourismCustomListItem: FunctionComponent<TourismCustomListItemPropsType> = ({
	href,
	bullit,
	value,
}) => (
	<a
		className="tourism-custom-list__item"
		href={href}
	>
		<div className="tourism-custom-list__bullet">
			{bullit}
		</div>
		<div className="tourism-custom-list__value">
			{value}
		</div>
	</a>
)
