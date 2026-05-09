import { FunctionComponent } from 'preact'
import { LinksType } from 'api-types/links.types'

import { LinksElement } from 'components/info-service/links/links-element'
import { TextContainer } from 'components/ui/text-container'

type LinksListPropsType = {
	links: LinksType[]
}
export const LinksList: FunctionComponent<LinksListPropsType> = ({ links }) => {
	return (
		<TextContainer>
			<ul>
				{links.map(item => <LinksElement {...item} />)}
			</ul>
		</TextContainer>
	)
}
