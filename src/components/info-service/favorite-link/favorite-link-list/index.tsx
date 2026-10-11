import { FunctionComponent } from 'preact'
import { LinksType } from 'api-types/links.types'

import { FavoriteLinkItem } from 'components/info-service/favorite-link/favorite-link-item'
import { TextContainer } from 'components/ui/text-container'

// TODO: [ONE_CLASS_COMPONENT] прям отдельный компонент нужен? Мб, сделать общий с className

type FavoriteLinkListPropsType = {
	linkList: LinksType[] | null
}

export const FavoriteLinkList: FunctionComponent<FavoriteLinkListPropsType> = ({ linkList }) => linkList && (
	<TextContainer>
		<ul>
			{linkList.map(item => <FavoriteLinkItem {...item} />)}
		</ul>
	</TextContainer>
)
