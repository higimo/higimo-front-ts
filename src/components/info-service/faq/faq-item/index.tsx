import { FunctionComponent } from 'preact'
import { FaqType } from 'api-types/faq.types'

import { OnlyAdmin } from 'components/util/only-admin'
import { TextContainer } from 'components/ui/text-container'

import { ROUTE_LINK } from 'dic/route/ROUTE_LINK'

type FaqItemPropsType = {
	faq: FaqType | null
}

export const FaqItem: FunctionComponent<FaqItemPropsType> = ({ faq }) => faq && (
	<div className="faq-page">
		<TextContainer>
			<h1>{faq.name}</h1>
			<OnlyAdmin>
				<a href={ROUTE_LINK.faqFormEdit({ idcode: faq.id })}>
					✏️
				</a>
			</OnlyAdmin>
		</TextContainer>
		<TextContainer>
			<div
				className="container"
				dangerouslySetInnerHTML={{__html: faq.text}}
			/>
		</TextContainer>
	</div>
)
