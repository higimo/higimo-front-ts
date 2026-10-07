import { FunctionComponent } from 'preact'
import { LinksType } from 'api-types/links.types'

import { LinksElement } from 'components/info-service/links/links-element'
import { TextContainer } from 'components/ui/text-container'

type LinksListPropsType = {
	linkList: LinksType[] | null
}

export const LinksList: FunctionComponent<LinksListPropsType> = ({ linkList }) => linkList && (
	<TextContainer>
		<ul>
			{linkList.map(item => <LinksElement {...item} />)}
		</ul>
	</TextContainer>
)
