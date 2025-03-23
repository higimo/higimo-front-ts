import { FunctionComponent } from 'preact'

import { FaqSingle } from '../../../../../components/info-service/faq/faq-single'

export const FaqSinglePage: FunctionComponent = props => {
	document.title = 'Статьи'

	return (
		<div className="faq-page">
			<FaqSingle />
		</div>
	)
}
