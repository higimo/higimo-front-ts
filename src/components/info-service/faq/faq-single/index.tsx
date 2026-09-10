import { FunctionComponent } from 'preact'
import { FaqType } from 'api-types/faq.types'

import { TextContainer } from 'components/ui/text-container'

type FaqSinglePropsType = {
	faq: FaqType
}

export const FaqSingle: FunctionComponent<FaqSinglePropsType> = ({ faq }) => (
	<div className="faq-page">
		<TextContainer>
			<h1>{faq.name}</h1>
		</TextContainer>
		<TextContainer>
			<div
				className="container"
				dangerouslySetInnerHTML={{__html: faq.text}}
			/>
		</TextContainer>
	</div>
)
