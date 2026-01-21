import { FunctionComponent } from 'preact'

import { usePageTitle } from 'hook/use-page-title'

import { FaqList } from 'components/info-service/faq/faq-list'

export const FaqListPage: FunctionComponent = props => {
	usePageTitle('Статьи')

	return (
		<div className="faq-page">
			<FaqList />
		</div>
	)
}
