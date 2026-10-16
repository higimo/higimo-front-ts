import { FunctionComponent } from 'preact'
import { LinksType } from 'api-types/links.types'

import { FavoriteLinkItem } from 'components/info-service/favorite-link/favorite-link-item'
import { TextContainer } from 'components/ui/text-container'

type FavoriteLinkListPropsType = {
	linkList: LinksType[] | null
}

// TODO: перенести TextContainer в родителя
export const FavoriteLinkList: FunctionComponent<FavoriteLinkListPropsType> = ({ linkList }) => linkList && (
	<TextContainer>
		<ul>
			{linkList.map(item => <FavoriteLinkItem key={item.id} {...item} />)}
		</ul>
	</TextContainer>
)
