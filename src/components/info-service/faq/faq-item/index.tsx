import { FunctionComponent } from 'preact'
import { FaqType } from 'api-types/faq.types'

import { OnlyAdmin } from 'components/util/only-admin'
import { TextContainer } from 'components/ui/text-container'

import { ROUTE_LINK } from 'dic/route/ROUTE_LINK'

type FaqItemPropsType = {
	faqItem: FaqType | null
}

export const FaqItem: FunctionComponent<FaqItemPropsType> = ({
	faqItem,
}) => faqItem && (
	<div className="faq-page">
		<TextContainer>
			<h1>{faqItem.name}</h1>
			<OnlyAdmin>
				<a href={ROUTE_LINK.faqFormEdit({ idcode: faqItem.id })}>
					✏️
				</a>
			</OnlyAdmin>
		</TextContainer>
		<TextContainer>
			<div
				className="container"
				dangerouslySetInnerHTML={{__html: faqItem.text}}
			/>
		</TextContainer>
	</div>
)
