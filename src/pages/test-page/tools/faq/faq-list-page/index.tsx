import { FunctionComponent } from 'preact'

import { FaqList } from '../../../../../components/info-service/faq/faq-list'

export const FaqListPage: FunctionComponent = props => {
	document.title = 'Статьи'

	return (
		<div className="faq-page">
			<FaqList />
		</div>
	)
}
