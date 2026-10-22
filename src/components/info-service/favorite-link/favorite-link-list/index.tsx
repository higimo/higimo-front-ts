import { FunctionComponent } from 'preact'
import { LinksType } from 'api-types/links.types'

import { FavoriteLinkItem } from 'components/info-service/favorite-link/favorite-link-item'

type FavoriteLinkListPropsType = {
	linkList: LinksType[]
}

export const FavoriteLinkList: FunctionComponent<FavoriteLinkListPropsType> = ({
	linkList,
}) => (
	<div className="best-link">
		{linkList.map(item => (
			<FavoriteLinkItem
				key={item.id}
				{...item}
			/>
		))}
	</div>
)
