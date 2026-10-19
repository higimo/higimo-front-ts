import { FunctionComponent } from 'preact'
import { LinksType } from 'api-types/links.types'

import { FavoriteLinkItem } from 'components/info-service/favorite-link/favorite-link-item'

type FavoriteLinkListPropsType = {
	linkList: LinksType[] | null
}

export const FavoriteLinkList: FunctionComponent<FavoriteLinkListPropsType> = ({ linkList }) => linkList && (
	<ul>
		{linkList.map(item => (
			<FavoriteLinkItem
				key={item.id}
				{...item}
			/>
		))}
	</ul>
)
