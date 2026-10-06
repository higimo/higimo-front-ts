import { FunctionComponent } from 'preact'
import { FaqType } from 'api-types/faq.types'

import { TextContainer } from 'components/ui/text-container'

import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'
import { OnlyAdmin } from 'components/util/only-admin'

type FaqSinglePropsType = {
	faq: FaqType | null
}

export const FaqSingle: FunctionComponent<FaqSinglePropsType> = ({ faq }) => faq && (
	<div className="faq-page">
		<TextContainer>
			<h1>{faq.name}</h1>
			<OnlyAdmin>
				<a href={ROUTE_LINKS.faqFormEdit({ idcode: faq.id })}>
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
